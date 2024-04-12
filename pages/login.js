import { Container, Text, Input, Spacer, Loading } from "@nextui-org/react";
import Layout from "../components/Layout";
import { Grid, Button, Card } from "@nextui-org/react";
import { useState } from "react";
import { auth, db } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const login = async () => {
    setIsLoading(true);
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
          // router.reload();
          router.push("/ngo/dashboard");
        } else if (userType === "Hospital") {
          // router.reload();
          router.push("/hospital/viewRequests");
        } else {
          setErrorMessage("Invalid user type");
        }
        // Store the user ID in a cookie
        Cookies.set("userId", userId);
      } else {
        setErrorMessage("User not found");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
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
              {errorMessage && (
                <Text color="error" css={{ marginTop: "0.5rem" }}>
                  {errorMessage}
                </Text>
              )}
              <Spacer y={1} />
              <Grid css={{ marginLeft: "10%" }}>
                <Button
                  shadow
                  color="primary"
                  onPress={login}
                  css={{ marginLeft: "10%" }}
                  disabled={isLoading}
                >
                  {isLoading ? <Loading type="points" /> : "Login"}
                </Button>
              </Grid>
            </Grid>
            <Text color="error">
              NOTE : If you are a hospital representative, then you can visit
              the nearest NGO branch and register
            </Text>
          </Grid.Container>
        </Card>
      </Container>
    </Layout>
  );
};

export default Login;
