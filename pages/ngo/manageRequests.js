import { useState, useEffect } from "react";
import { collection, getDocs, query, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import styles from "../../CSS/ngo/manageRequests.module.css";
import NGOlayout from "../../components/NGOlayout";
import { Loading } from "@nextui-org/react";

const ManageRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

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
        const requestRef = doc(db, "requests", id);
        await updateDoc(requestRef, {
            status: "Approved",
        });
        setRequests(requests.map((req) => (req.id === id ? { ...req, status: "Approved" } : req)));
    };

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
                <Loading css={{ marginLeft: "50%", marginTop: "300px" }} />
            </NGOlayout>
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
                                                <button className={`${styles.button} ${styles.approve}`} onClick={() => handleApprove(request.id)}>
                                                    Approve
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