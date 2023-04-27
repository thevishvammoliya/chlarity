import { NextUIProvider, Spacer, Container, Card, Grid, Text } from "@nextui-org/react";
import NavigationBar from "../../components/NavigationBar";
import NGOlayout from "../../components/NGOlayout";
import NGONavbar from "../../components/NGONavbar";

export default function Dashboard() {
    return (
        <>
            <NGOlayout>
                <Spacer y={10} />
                <Container justify="center" display="flex">
                    <Card css={{ mw: "400px", p: "20px" }}>
                        <Grid.Container gap={2} justify="center" alignContent="center">
                            <Grid justify="center" alignItems="baseline">
                                <Text h4>Current Balance:</Text>
                                <Text h2 css={{ textGradient: "45deg, #000046 20%, #1CB5E0 80%" }} weight="bold">25 Ether</Text>
                            </Grid>
                        </Grid.Container>
                    </Card>
                </Container>
            </NGOlayout>
        </>
    );
}