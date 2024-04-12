import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import NGOlayout from "../../components/NGOlayout";
import styles from "../../CSS/ngo/manageHospitals.module.css";
import { Loading } from "@nextui-org/react";

const ManageHospitals = () => {
    const [hospitals, setHospitals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            if (user) {
                const hospitalsCollectionRef = collection(db, "hospitals");
                const hospitalsSnapshot = await getDocs(hospitalsCollectionRef);
                const hospitalsData = hospitalsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setHospitals(hospitalsData);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [user]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return unsubscribe;
    }, []);

    if (!user) {
        return (
            <NGOlayout>
                <div className={styles.container}>
                    <h1 className={styles.title}>Manage Hospitals</h1>
                    <p className={styles.error}>Please login to see the details.</p>
                </div>
            </NGOlayout>
        );
    }

    // const handleDelete = async (id) => {
    //     try {
    //         await deleteDoc(doc(db, "hospitals", id));
    //         await deleteDoc(doc(db, "users", id));
    //         setHospitals((prevHospitals) =>
    //             prevHospitals.filter((hosp) => hosp.id !== id)
    //         );
    //         console.log("Hospital deleted successfully!");
    //     } catch (error) {
    //         console.error("Error deleting hospital:", error);
    //     }
    // };

    return (
        <NGOlayout>
            <div className={styles.container}>
                <h1 className={styles.title}>Manage Hospitals</h1>
                {isLoading ? (
                    <Loading size="lg"></Loading>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles["header-cell"]}>Hospital Name</th>
                                <th className={styles["header-cell"]}>Hospital ID</th>
                                <th className={styles["header-cell"]}>
                                    MetaMask Wallet Address
                                </th>
                                <th className={styles["header-cell"]}>Services</th>
                                {/* <th className={styles["header-cell"]}>Actions</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {hospitals.map((hospital) => (
                                <tr key={hospital.id}>
                                    <td className={styles["row-cell"]}>{hospital.name}</td>
                                    <td className={styles["row-cell"]}>{hospital.hospitalId}</td>
                                    <td className={styles["row-cell"]}>
                                        {hospital.walletAddress}
                                    </td>
                                    <td className={styles["row-cell"]}>{hospital.services}</td>
                                    {/* <td className={styles["row-cell"]}>
                                        <button
                                            className={styles["delete-button"]}
                                            onClick={() => handleDelete(hospital.id)}
                                        >
                                            Delete
                                        </button>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </NGOlayout>
    );
};

export default ManageHospitals;
