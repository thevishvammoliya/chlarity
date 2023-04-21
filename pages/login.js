import { Container, Text, Input, Spacer } from "@nextui-org/react";
import Layout from "../components/Layout";
import { Grid, Button, Card } from "@nextui-org/react";
import { useState } from "react";
import { auth, db } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { collection, doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const router = useRouter();

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;
      const userDocRef = doc(db, "users", userId);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userType = userDocSnapshot.data().role;
        if (userType === "ngo") {
          router.push("/ngo/dashboard");
        } else if (userType === "hospital") {
          router.push("/hospital/createRequest");
        } else {
          // handle invalid user type
        }
      } else {
        // handle user not found
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Container css={{ padding: "5%" }} justify="center" display="flex">
        <Card css={{ mw: "400px", p: "20px" }}>
          <Grid.Container gap={2} justify="center" alignContent="center">
            <Grid justify="center" alignItems="baseline">
              <Text
                h2
                css={{ textGradient: "45deg, #000046 -20%, #1CB5E0 50%" }}
                weight="bold"
              >
                Login
              </Text>
              <Spacer y={1.6} />
              <Input
                label="Email"
                fullWidth
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Input.Password
                label="Password"
                fullWidth
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Spacer y={1} />
              <Grid css={{ marginLeft: "10%" }}>
                <Button shadow color="primary" onPress={login}>
                  Login
                </Button>
                {/* <Button
                  light
                  color="primary"
                  css={{ marginTop: "5px" }}
                  as={Link}
                  href="/signup"
                >
                  New? Sign up!
                </Button> */}
              </Grid>
            </Grid>
            <Text color="error">
              NOTE: Login feature is only for NGO Admins
            </Text>
          </Grid.Container>
        </Card>
      </Container>
    </Layout>
  );
};

export default Login;
