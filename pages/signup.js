import {
    Input,
    Text,
    Button,
    Link,
    Grid,
    Card,
    Spacer,
    Container,
} from "@nextui-org/react";
import { React, useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { db, auth } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const usersCollectionRef = collection(db, "users");

    useEffect(() => {
        alert(
            " Warning : Signup Feature is currently only available for NGO admins!!!"
        );
    });

    async function signup() {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        await addDoc(usersCollectionRef, { email: email });
        console.log(user);
    }

    return (
        <Layout>
            <Container css={{ padding: "5%" }} justify="center" display="flex">
                <Card css={{ mw: "400px", p: "20px" }} bordered>
                    <Text
                        h2
                        css={{ textGradient: "45deg, #000046 -30%, #1CB5E0 50%" }}
                        weight="bold"
                    >
                        Signup
                    </Text>
                    <Grid.Container gap={2} justify="center">
                        <Grid justify="center" alignItems="baseline">
                            <Grid>
                                <Spacer y={1} />
                                <Input label="Full Name" fullWidth />
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
                                <Button shadow color="primary" onPress={signup}>
                                    Signup
                                </Button>
                                <Button
                                    light
                                    color="primary"
                                    css={{ marginTop: "5px" }}
                                    as={Link}
                                    href="/login"
                                >
                                    Have an Account?
                                </Button>
                            </Grid>
                            <Text color="secondary">
                                NOTE : If you are a hospital representative, then you can visit
                                the nearest NGO branch and register for free.
                            </Text>
                        </Grid>
                    </Grid.Container>
                </Card>
            </Container>
        </Layout>
    );
}
export default SignUp;
