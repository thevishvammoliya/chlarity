import { Container, Text, Link, Input, Spacer } from "@nextui-org/react";
import Layout from "../components/Layout";
import { Grid, Button, Card } from "@nextui-org/react";
import { Component } from "react";
import main from '../ethereum/main';
import web3 from "../ethereum/web3";

class Funds extends Component {

    state = {
        balance: ''
    }

    async componentDidMount() {
        var balance = await main.methods.getBalance().call();
        balance = (web3.utils.fromWei(balance));
        this.setState({ balance });
    }

    render() {
        return (
            <Layout>
                <Spacer y={10} />
                <Container justify="center" display="flex">
                    <Card css={{ mw: "400px", p: "20px" }}>
                        <Grid.Container gap={2} justify="center" alignContent="center">
                            <Grid justify="center" alignItems="baseline">
                                <Text h4>Current Balance:</Text>
                                <Text h2 css={{ textGradient: "45deg, #000046 -30%, #1CB5E0 50%" }} weight="bold">{this.state.balance} Ether</Text>
                            </Grid>
                        </Grid.Container>
                    </Card>
                </Container>

            </Layout>
        );
    }
}
export default Funds;