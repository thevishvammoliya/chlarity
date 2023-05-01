import { useState, useEffect } from "react";
import { collection, getDocs, where, query, LoadBundleTask } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import styles from "../../CSS/hospital/ViewRequests.module.css";
import HospitalLayout from "../../components/HospitalLayout";
import { Loading } from "@nextui-org/react";

const ViewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      if (user) {
        const q = query(collection(db, "requests"), where("hospitalId", "==", user.uid));
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
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <HospitalLayout>
        <Loading css={{ marginLeft: "50%", marginTop: "300px" }} />
      </HospitalLayout>

    );
  }

  if (!user) {
    return (
      <HospitalLayout>
        <div className={styles.container}>
          <h1 className={styles.title}>View Requests</h1>
          <p className={styles.error}>Please login to see the details.</p>
        </div>
      </HospitalLayout>
    );
  }

  return (
    <HospitalLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>View Requests</h1>
        {requests.length > 0 ? (
          <table className={styles.table}>
            <thead className={styles.header}>
              <tr>
                <th className={styles.cell}>Patient Name</th>
                <th className={styles.cell}>Hospital Name</th>
                <th className={styles.cell}>Treatment Required</th>
                <th className={styles.cell}>Amount</th>
                <th className={styles.cell}>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className={styles.row}>
                  <td className={styles.cell}>{request.patientName}</td>
                  <td className={styles.cell}>{request.hospitalName}</td>
                  <td className={styles.cell}>{request.treatmentType}</td>
                  <td className={styles.cell}>{request.amount}</td>
                  <td
                    className={`${styles.cell} ${styles[`status-${request.status.toLowerCase()}`]}`}
                  >
                    {request.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.error}>No requests found.</p>
        )}
      </div>
    </HospitalLayout>
  );

};

export default ViewRequests;
