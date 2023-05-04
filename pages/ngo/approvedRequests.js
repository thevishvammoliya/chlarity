import { useState, useEffect } from "react";
import { collection, getDocs, query, doc, updateDoc, where, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import styles from "../../CSS/ngo/approvedRequests.module.css";
import NGOlayout from "../../components/NGOlayout";
import { Loading } from "@nextui-org/react";
import main from "../../ethereum/main";
import web3 from "../../ethereum/web3";


const ApprovedRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [finalising, setFinalising] = useState(false);
    const [reverting, setReverting] = useState(false);

    useEffect(() => {
        const fetchRequests = async () => {
            setLoading(true);
            if (user) {
                const q = query(collection(db, "approvedRequests"), where("status", "==", "Approved"));
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

    const handleFinalize = async (id) => {
        const confirmed = window.confirm("Are you sure you want to finalize this request? This will transfer the balance in this request contract to the recipient hospital address. This action cannot be undone.");
        if (confirmed) {
            try {
                setFinalising(true);
                const approvedRequestRef = doc(db, "approvedRequests", id);
                const approvedRequestDoc = await getDoc(approvedRequestRef);
                const approvedRequest = approvedRequestDoc.data();
                const requestId = approvedRequest.requestId;
                const accounts = await web3.eth.getAccounts();
                try {
                    await main.methods.finalizeRequest(approvedRequest.requestAddress).send({ from: accounts[0] });
                } catch (error) {
                    throw new Error('Error while finalizing request: ' + error.message);
                }
                // update status in approvedRequests collection
                await updateDoc(approvedRequestRef, {
                    status: "Finalized",
                });

                // update status in requests collection
                const requestRef = doc(db, "requests", requestId);
                await updateDoc(requestRef, {
                    status: "Finalized",
                });

                setRequests(requests.map((req) => (req.id === id ? { ...req, status: "Finalized" } : req)));
                setFinalising(false);

            } catch (error) {
                setFinalising(false);
                setErrorMessage(error.message);
            }
        };
    }

    const handleRevert = async (id) => {
        const confirmed = window.confirm("Are you sure you want to revert this request? This will delete this request contract and transffer back the balance to main contract. This action cannot be undone.");
        if (confirmed) {
            try {
                setReverting(true);
                const approvedRequestRef = doc(db, "approvedRequests", id);
                const approvedRequestDoc = await getDoc(approvedRequestRef);
                const approvedRequest = approvedRequestDoc.data();
                const requestId = approvedRequest.requestId;
                const accounts = await web3.eth.getAccounts();

                try {
                    await main.methods.destroyRequest(approvedRequest.requestAddress).send({ from: accounts[0] });
                } catch (error) {
                    throw new Error('Error while reverting request: ' + error.message);
                }

                // update status in approvedRequests collection
                await updateDoc(approvedRequestRef, {
                    status: "Reverted",
                });

                // update status in requests collection
                const requestRef = doc(db, "requests", requestId);
                await updateDoc(requestRef, {
                    status: "Reverted",
                });
                setRequests(requests.map((req) => (req.id === id ? { ...req, status: "Reverted" } : req)));
                setReverting(false);
            } catch (error) {
                setReverting(false);
                setErrorMessage(error.message);
            }
        }
    };

    if (loading) {
        return (
            <NGOlayout>
                <div className={styles.container}>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.row}>
                                <th className={styles.tableHead}>Request Address</th>
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
                                <td className={styles.cell}></td>
                                <td className={styles.cell}></td>
                                <td className={styles.cell}></td>
                                <td className={styles.cell}></td>
                                <td className={styles.cell}></td>
                                <td className={styles.cell}></td>
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
                    <h1 className={styles.title}>Approved Requests</h1>
                    <p className={styles.error}>Please login to see the details.</p>
                </div>
            </NGOlayout>
        );
    }

    return (
        <NGOlayout>
            <div className={styles.container}>
                <h1 className={styles.title}>Approved Requests</h1>
                {requests.length > 0 ? (
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.row}>
                                <th className={styles.tableHead}>Request Address</th>
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
                                    <td className={`${styles.cell} ${styles.requestAddress}`}>{request.requestAddress}</td>
                                    <td className={styles.cell}>{request.patientName}</td>
                                    <td className={styles.cell}>{request.hospitalName}</td>
                                    <td className={styles.cell}>{request.treatmentType}</td>
                                    <td className={styles.cell}>{request.amount}</td>
                                    <td className={`${styles.cell} ${styles[`status-${request.status.toLowerCase()}`]}`}>
                                        {request.status}
                                    </td>
                                    <td className={styles.cell}>
                                        <button className={`${styles.button} ${styles.finalize}`} disabled={finalising} onClick={() => handleFinalize(request.id)}>
                                            {finalising ? <Loading type="points" /> : "Finalize"}
                                        </button>
                                        <button className={`${styles.button} ${styles.revert}`} disabled={reverting} onClick={() => handleRevert(request.id)}>
                                            {reverting ? <Loading type="points" color="error" /> : "Revert"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className={styles.message}>No approved requests.</p>
                )}
            </div>
        </NGOlayout>
    );
};


export default ApprovedRequests;
