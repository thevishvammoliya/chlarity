import { Input, Dropdown, Text, Radio, Button, Menu, Link, Grid, Card, Spacer, Container } from "@nextui-org/react";
import React, { Component } from "react";
import Layout from "../components/Layout";

class SignUp extends Component {
    state = {
        userType: '',

    }

    onSignUp() {
        console.log(this.state.userType)
    }

    render() {
        return (
            <Layout>
                <Spacer y={7} />
                <Container justify="center" display="flex">
                    <Card css={{ mw: '400px', p: '20px' }} bordered>
                        <Text h2 css={{ textGradient: "45deg, #000046 -30%, #1CB5E0 50%" }} weight="bold">Signup</Text>
                        <Grid.Container gap={2} justify="center">
                            <Grid justify="center" alignItems="baseline">
                                <Grid>
                                    <Radio.Group label="User Type" defaultValue="donor" orientation="horizontal">
                                        <Radio value="donor" id="donor" size="sm">Donor</Radio>
                                        <Radio value="hospital" id="hospital" size="sm">Hospital</Radio>
                                        <Radio value="ngo" id="ngo" size="sm">NGO</Radio>
                                    </Radio.Group>
                                    <Spacer y={1} />
                                    <Input label="Full Name" fullWidth />
                                    <Input label="Email" type="email" fullWidth />
                                    <Input.Password label="Password" fullWidth />
                                </Grid>
                                <Spacer y={0.5} />
                                <Grid css={{ marginLeft: '60px' }}>
                                    <Button shadow color="primary">SignUp</Button>
                                    <Button light color="primary" css={{ marginTop: "5px" }} as={Link} href="/login">Have an Account?</Button>
                                </Grid>
                            </Grid>
                        </Grid.Container>
                    </Card>
                </Container>
            </Layout>
        );
    }
}
export default SignUp;