import { Container, Image, Text, Link, Input, Spacer, Loading } from "@nextui-org/react";
import Layout from "../components/Layout";
import { Grid, Button, Card } from "@nextui-org/react";
import { Component } from "react";
import main from "../ethereum/main";
import web3 from "../ethereum/web3";

class Donate extends Component {
    state = {
        amount: '',
        loading: false,
        success: false
    }

    donateClick = async () => {
        const accounts = await web3.eth.getAccounts();
        try {
            this.setState({ loading: true });
            await main.methods.Donate().send({ from: accounts[0], value: web3.utils.toWei((this.state.amount), 'Ether') });
            this.setState({ success: true });
        } catch (err) {
            console.log(err.message);
        }
        this.setState({ loading: false, amount: '' });
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
                                    <Button shadow color="primary" onPress={this.donateClick} disabled={this.state.loading}>
                                        {this.state.loading ? <Loading type="points" /> : "Donate"}
                                    </Button>
                                </Grid>
                                {this.state.success && (
                                    <Text color="success" css={{ mt: '1rem' }}>Thank you for your donation!</Text>
                                )}
                            </Grid>
                        </Grid.Container>
                    </Card>
                </Container>
            </Layout>
        );
    }
}

export default Donate;
