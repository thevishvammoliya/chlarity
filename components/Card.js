import { Card, Grid, Text } from "@nextui-org/react";

export default function App() {
    return (
        <Grid.Container gap={2}>
            <Grid sm={12} md={5}>
                <Card >
                    <Card.Body>
                        <Text>Funds : 25 ETH(shadow)</Text>
                    </Card.Body>
                </Card>
            </Grid>
            <Grid sm={12} md={5}>
                <Card >
                    <Card.Body>
                        <Text>Funds : 25 ETH(shadow)</Text>
                    </Card.Body>
                </Card>
            </Grid>
        </Grid.Container>);
}