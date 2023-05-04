import { Input, Text, Button, Link, Grid, Card, Spacer, Container, Loading } from "@nextui-org/react";
import { React, useState, useEffect } from "react";
import NGOlayout from "../../components/NGOlayout";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";

const RegisterHospital = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hospitalName, setHospitalName] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [services, setServices] = useState("");
    const [hospitalId, setHospitalId] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);

    async function registerHospital() {
        try {
            // Create the auth user with email and password
            const user = await createUserWithEmailAndPassword(auth, email, password);

            // Create a document for the hospital in the hospitals collection
            const hospitalDocRef = doc(db, "hospitals", user.user.uid);
            await setDoc(hospitalDocRef, {
                name: hospitalName,
                walletAddress: walletAddress,
                services: services,
                hospitalId: hospitalId,
            });

            // Create a document for the hospital user in the users collection
            const usersCollectionRef = doc(db, "users", user.user.uid);
            await setDoc(usersCollectionRef, {
                role: "Hospital",
                email: email,
                hospitalName: hospitalName,
                hospitalId: hospitalId,
            });

            // Sign out the newly created user
            await auth.signOut();

            // Reset the form and show success message
            setIsSuccess(true);
            resetForm();

            console.log("Registration successful!");
        } catch (error) {
            setError(error.message);
            console.error("Error registering hospital:", error);
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return unsubscribe;
    }, []);

    function resetForm() {
        setEmail("");
        setPassword("");
        setHospitalName("");
        setWalletAddress("");
        setServices("");
        setHospitalId("");
    }

    return (
        <NGOlayout>
            <Container css={{ padding: "5%" }} justify="center" display="flex">
                <Card css={{ mw: "400px", p: "20px" }} >
                    <Text
                        h2
                        css={{ textGradient: "45deg, #000046 -30%, #1CB5E0 50%" }}
                        weight="bold"
                    >
                        Register Hospital
                    </Text>
                    {!user ? (
                        <Text> Please Login to access this page</Text>
                    ) : (
                        <Grid.Container gap={2} justify="center">
                            <Grid justify="center" alignItems="baseline">
                                <Grid>
                                    <Spacer y={1} />
                                    <Input label="Hospital Name" fullWidth value={hospitalName} onChange={(event) => setHospitalName(event.target.value)} />
                                    <Input label="Hospital ID" fullWidth value={hospitalId} onChange={(event) => setHospitalId(event.target.value)} />
                                    <Input label="MetaMask Wallet Address" fullWidth value={walletAddress} onChange={(event) => setWalletAddress(event.target.value)} />
                                    <Input label="Services" fullWidth value={services} onChange={(event) => setServices(event.target.value)} />
                                    <Spacer y={1} />
                                    <Input label="Email" type="email" fullWidth value={email} onChange={(event) => setEmail(event.target.value)} />
                                    <Input label="Password" type="password" fullWidth value={password} onChange={(event) => setPassword(event.target.value)} />
                                    {isSuccess ? (
                                        <Text h4 color="success">
                                            Hospital registered successfully!
                                        </Text>
                                    ) : null}
                                    {error ? (
                                        <Text h4 color="error">
                                            Error: {error}
                                        </Text>
                                    ) : null}
                                </Grid>
                                {/* <Spacer y={1} /> */}
                                <Grid css={{ marginLeft: "18%" }}>
                                    <Button type="submit" shadow onPress={registerHospital} >
                                        Register
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid.Container>)}
                </Card>
            </Container>
        </NGOlayout>
    );
};

export default RegisterHospital;
