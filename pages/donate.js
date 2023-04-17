import { Container, Image, Text, Link, Input, Spacer } from "@nextui-org/react";
import Layout from "../components/Layout";
import { Grid, Button, Card } from "@nextui-org/react";
import { Component } from "react";
import main from "../ethereum/main";
import web3 from "../ethereum/web3";

class Donate extends Component {

    state = { amount: '' }


    donateClick = async () => {
        const accounts = await web3.eth.getAccounts();
        try {
            await main.methods.Donate().send({ from: accounts[0], value: web3.utils.toWei((this.state.amount), 'Ether') });
        } catch (err) {
            console.log(err.message);
        }
    }
    render() {
        return (
            <Layout>
                <Spacer y={10} />
                <Container justify="center" display="flex">
                    <Card css={{ mw: "400px", p: "20px" }}>
                        <Grid.Container gap={2} justify="center" alignContent="center">
                            <Grid justify="center" alignItems="baseline">
                                <Text h2 css={{ textGradient: "45deg, #000046 -30%, #1CB5E0 50%" }} weight="bold">Donate</Text>
                                <Spacer y={1.6} />
                                <Input label="Amount" placeholder="Ξ Ether" fullWidth
                                    value={this.state.amount}
                                    onChange={event => this.setState({ amount: event.target.value })} />
                                <Spacer y={1} />
                                <Grid>
                                    <Button shadow color="primary" onPress={this.donateClick}>Donate</Button>
                                </Grid>
                            </Grid>
                        </Grid.Container>
                    </Card>
                </Container>
            </Layout>
        );
    }
}
export default Donate;