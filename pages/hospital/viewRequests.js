import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import styles from "../../CSS/ViewRequests.module.css";
import HospitalLayout from "../../components/HospitalLayout";

const ViewRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const requestsCollection = collection(db, "requests");
      const requestsSnapshot = await getDocs(requestsCollection);
      const requestsList = requestsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequests(requestsList);
    };
    fetchRequests();
  }, []);

  return (
    <HospitalLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>View Requests</h1>
        <table className={styles.table}>
          <thead className={styles.header}>
            <tr>
              <th className={styles.cell}>Patient Name</th>
              <th className={styles.cell}>Hospital Name</th>
              <th className={styles.cell}>Treatment Required</th>
              <th className={styles.cell}>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className={styles.row}>
                <td className={styles.cell}>{request.patient_name}</td>
                <td className={styles.cell}>{request.hospital_id}</td>
                <td className={styles.cell}>{request.treatment_type}</td>
                <td
                  className={`${styles.cell} ${
                    styles[`status-${request.status.toLowerCase()}`]
                  }`}
                >
                  {request.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </HospitalLayout>
  );
};

export default ViewRequests;
