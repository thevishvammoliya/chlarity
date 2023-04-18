import { Container, Text, Link, Input, Spacer } from "@nextui-org/react";
import Layout from "../components/Layout";
import { Grid, Button, Card } from "@nextui-org/react";
import { Component } from "react";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    async login() {
        const user = await signInWithEmailAndPassword(auth, this.state.email, this.state.password);
        console.log(user);
    }

    render() {
        return (
            <Layout>
                <Spacer y={10} />
                <Container justify="center" display="flex">
                    <Card css={{ mw: "400px", p: "20px" }}>
                        <Grid.Container gap={2} justify="center" alignContent="center">
                            <Grid justify="center" alignItems="baseline">
                                <Text h2 css={{ textGradient: "45deg, #000046 -20%, #1CB5E0 50%" }} weight="bold">Login</Text>
                                <Spacer y={1.6} />
                                <Input label="Email" fullWidth value={this.state.email} onChange={event => this.setState({ email: event.target.value })} />
                                <Input.Password label="Password" fullWidth value={this.state.password} onChange={event => this.setState({ password: event.target.value })} />
                                <Spacer y={1} />
                                <Grid css={{ marginLeft: '60px' }}>
                                    <Button shadow color="primary" onPress={this.login}>Login</Button>
                                    <Button light color="primary" css={{ marginTop: '5px' }} as={Link} href="/signup">New? Sign up!</Button>
                                </Grid>
                            </Grid>
                        </Grid.Container>
                    </Card>
                </Container>
            </Layout >
        );
    }
}
export default Login;
