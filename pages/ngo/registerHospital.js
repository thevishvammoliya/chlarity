import { Input, Text, Button, Link, Grid, Card, Spacer, Container } from "@nextui-org/react";
import { React, useState } from "react";
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

    async function registerHospital() {
        try {
            // Create the auth user with email and password
            const user = await createUserWithEmailAndPassword(auth, email, password);
            setHospitalId(user.uid);

            // Create a document for the hospital in the hospitals collection
            const hospitalDocRef = collection(db, "hospitals", hospitalId);
            await addDoc(hospitalDocRef, {
                name: hospitalName,
                walletAddress: walletAddress,
                services: services,
                hospitalId: user.uid,
            });

            // Create a document for the hospital user in the users collection
            const usersCollectionRef = collection(db, "users", hospitalId);
            await addDoc(usersCollectionRef, {
                role: "Hospital",
                email: email,
                hospitalName: hospitalName,
                hospitalId: hospitalId,
            });

            // Sign out the newly created user
            await auth.signOut();

            console.log("Registration successful!");
        } catch (error) {
            console.error("Error registering hospital:", error);
        }
    }



    return (
        <NGOlayout>
            <Container css={{ padding: "5%" }} justify="center" display="flex">
                <Card css={{ mw: "400px", p: "20px" }} bordered>
                    <Text
                        h2
                        css={{ textGradient: "45deg, #000046 -30%, #1CB5E0 50%" }}
                        weight="bold"
                    >
                        Register Hospital
                    </Text>
                    <Grid.Container gap={2} justify="center">
                        <Grid justify="center" alignItems="baseline">
                            <Grid>
                                <Spacer y={1} />
                                <Input label="Hospital Name" fullWidth value={hospitalName} onChange={(event) => setHospitalName(event.target.value)} />
                                <Input label="MetaMask Wallet Address" fullWidth value={walletAddress} onChange={(event) => setWalletAddress(event.target.value)} />
                                <Input label="Services" fullWidth value={services} onChange={(event) => setServices(event.target.value)} />
                                <Input
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    fullWidth
                                />
                                <Input.Password
                                    label="Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Spacer y={0.5} />
                            <Grid css={{ marginLeft: "10%" }}>
                                <Button shadow color="primary" onPress={registerHospital}>
                                    Register Hospital
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid.Container>
                </Card>
            </Container>
        </NGOlayout>);
};
export default RegisterHospital;