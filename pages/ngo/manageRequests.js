import { useState, useEffect } from "react";
import { collection, getDocs, query, doc, updateDoc, addDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import styles from "../../CSS/ngo/manageRequests.module.css";
import NGOlayout from "../../components/NGOlayout";
import { Loading } from "@nextui-org/react";
import main from "../../ethereum/main";
import web3 from "../../ethereum/web3";

const ManageRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [rowLoading, setRowLoading] = useState(false);

    useEffect(() => {
        const fetchRequests = async () => {
            setLoading(true);
            if (user) {
                const q = query(collection(db, "requests"));
                const requestsSnapshot = await getDocs(q);
                const requestsList = requestsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setRequests(requestsList);
            }
            setLoading(false);
        };

        fetchRequests();
    }, [user]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return unsubscribe;
    }, []);

    const handleApprove = async (id) => {
        try {
            const confirmApprove = window.confirm(
                "Are you sure you want to approve this request? This will deploy a request contract with the requested balance. This action cannot be undone."
            );
            if (!confirmApprove) {
                return;
            }

            setRowLoading(true);
            //fetch the request data from the "requests" collection
            const requestRef = doc(db, "requests", id);
            const requestSnapshot = await getDoc(requestRef);
            if (!requestSnapshot.exists()) {
                throw new Error("Request does not exist");
            }
            const requestData = requestSnapshot.data();

            //Fetch the wallet address of the hospital using the hospitalId in the request
            const hospitalRef = doc(db, "hospitals", requestData.hospitalId);
            const hospitalSnapshot = await getDoc(hospitalRef);
            if (!hospitalSnapshot.exists()) {
                throw new Error("Hospital does not exist");
            }
            const hospitalData = hospitalSnapshot.data();
            const walletAddress = hospitalData.walletAddress;

            let requestAddress;
            const accounts = await web3.eth.getAccounts();
            // console.log(requestData.amount);
            // console.log(web3.utils.toWei(requestData.amount, 'ether'));
            try {
                const result = await main.methods
                    .createRequest(walletAddress, (web3.utils.toWei(requestData.amount, 'ether')))
                    .send({ from: accounts[0] });
                // console.log(result);
                requestAddress = result.events.RequestCreated.returnValues.requestAddress;
                console.log('Request contract deployed at: ', requestAddress);
            } catch (error) {
                throw new Error('Error while deploying request contract: ' + error.message);
            }

            const approvedRequestData = {
                ...requestData,
                status: "Approved",
                requestId: id,
                approvedBy: user.uid,
                approvedAt: new Date(),
                requestAddress: requestAddress,
            };


            // Add the approved request to a new collection called "approvedRequests"
            const approvedRequestRef = await addDoc(
                collection(db, "approvedRequests"),
                approvedRequestData,
            );

            // Update the status of the original request in the "requests" collection
            await updateDoc(requestRef, {
                status: "Approved",
                approvedRequestId: approvedRequestRef.id,
            });

            // Update the state of the "requests" array in the component to reflect the change
            setRequests((requests) =>
                requests.map((req) =>
                    req.id === id ? { ...req, status: "Approved" } : req
                )
            );

            setRowLoading(false)
        } catch (error) {
            console.error("Error while approving request:", error.message);
            setRowLoading(false);
            setErrorMessage(error.message);
        }
    }


    const handleReject = async (id) => {
        const requestRef = doc(db, "requests", id);
        await updateDoc(requestRef, {
            status: "Rejected",
        });
        setRequests(requests.map((req) => (req.id === id ? { ...req, status: "Rejected" } : req)));
    };



    if (loading) {
        return (
            <NGOlayout>
                <div className={styles.container}>
                    <table className={styles.table}>
                        <thead className={styles.h}>
                            <tr className={styles.row}>
                                <th className={styles.tableHead}>Patient Name</th>
                                <th className={styles.tableHead}>Hospital Name</th>
                                <th className={styles.tableHead}>Treatment Type</th>
                                <th className={styles.tableHead}>Amount</th>
                                <th className={styles.tableHead}>Status</th>
                                <th className={styles.tableHead}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr className={styles.row}>
                                <td></td>
                                <td></td>
                                <td className={styles.cell}><Loading css={{ marginRight: "50%" }} /></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </NGOlayout >
        );
    }


    if (!user) {
        return (
            <NGOlayout>
                <div className={styles.container}>
                    <h1 className={styles.title}>Manage Requests</h1>
                    <p className={styles.error}>Please login to see the details.</p>
                </div>
            </NGOlayout>
        );
    }

    return (
        <NGOlayout>
            <div className={styles.container}>
                <h1 className={styles.title}>Manage Requests</h1>
                {requests.length > 0 ? (
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.row}>
                                <th className={styles.tableHead}>Patient Name</th>
                                <th className={styles.tableHead}>Hospital Name</th>
                                <th className={styles.tableHead}>Treatment Type</th>
                                <th className={styles.tableHead}>Amount</th>
                                <th className={styles.tableHead}>Status</th>
                                <th className={styles.tableHead}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request.id} className={styles.row}>
                                    <td className={styles.cell}>{request.patientName}</td>
                                    <td className={styles.cell}>{request.hospitalName}</td>
                                    <td className={styles.cell}>{request.treatmentType}</td>
                                    <td className={styles.cell}>{request.amount}</td>
                                    <td className={`${styles.cell} ${styles[`status-${request.status.toLowerCase()}`]}`}>
                                        {request.status}
                                    </td>
                                    <td className={styles.cell}>
                                        {request.status.toLowerCase() === "pending" && (
                                            <>
                                                <button className={`${styles.button} ${styles.approve}`} disabled={rowLoading} onClick={() => handleApprove(request.id)}>
                                                    {rowLoading ? <Loading type="points" color="success" /> : "Approve"}
                                                </button>
                                                <button className={`${styles.button} ${styles.reject}`} onClick={() => handleReject(request.id)}>
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                ) : (
                    <p className={styles.noRequests}>No requests found.</p>
                )}
            </div>
        </NGOlayout >
    );
};

export default ManageRequests;