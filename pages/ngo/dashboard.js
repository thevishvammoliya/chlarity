import { Container, Text, Link, Input, Spacer, Loading } from "@nextui-org/react";
import { Grid, Button, Card } from "@nextui-org/react";
import { Component } from "react";
import main from "../../ethereum/main"
import web3 from "../../ethereum/web3";
import NGOlayout from "../../components/NGOlayout";

class Funds extends Component {

    state = {
        balance: '',
        loading: true // set loading to true initially
    }

    async componentDidMount() {
        var balance = await main.methods.getBalance().call();
        balance = (web3.utils.fromWei(balance));
        this.setState({ balance, loading: false }); // set loading to false after fetching the data
    }

    render() {
        const { loading, balance } = this.state;

        if (loading) {
            return (
                <NGOlayout>
                    <Spacer y={10} />
                    <Container justify="center" display="flex">
                        <Card css={{ mw: "400px", p: "20px" }}>
                            <Grid.Container gap={2} justify="center" alignContent="center">
                                <Grid justify="center" alignItems="baseline">
                                    <Loading type="points" />
                                </Grid>
                            </Grid.Container>
                        </Card>
                    </Container>
                </NGOlayout>
            )
        }

        return (
            <NGOlayout>
                <Spacer y={10} />
                <Container justify="center" display="flex">
                    <Card css={{ mw: "400px", p: "20px" }}>
                        <Grid.Container gap={2} justify="center" alignContent="center">
                            <Grid justify="center" alignItems="baseline">
                                <Text h4>Current Balance:</Text>
                                <Text h2 css={{ textGradient: "45deg, #000046 -30%, #1CB5E0 50%" }} weight="bold">{balance} Ether</Text>
                            </Grid>
                        </Grid.Container>
                    </Card>
                </Container>

            </NGOlayout>
        );
    }
}
export default Funds;
