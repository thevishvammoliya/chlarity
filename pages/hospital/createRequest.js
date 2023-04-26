import { Container, Text, Textarea, Input, Spacer } from "@nextui-org/react";
import Layout from "../../components/Layout";
import { Grid, Button, Card } from "@nextui-org/react";

export default function CreateRequest() {
  return (
    <Layout>
      <Spacer y={10} />
      <Container justify="center" display="flex">
        <Card css={{ mw: "400px", p: "20px" }}>
          <Grid.Container gap={2} justify="center" alignContent="center">
            <Grid justify="center" alignItems="baseline">
              <Text
                h2
                css={{ textGradient: "45deg, #000046 -30%, #1CB5E0 50%" }}
                weight="bold"
              >
                Create Request
              </Text>
              <Spacer y={1.6} />
              <Input label="Amount" placeholder="Ξ Ether" fullWidth />
              <Textarea
                label="Description"
                placeholder="Enter Request Description"
                fullWidth
              />
              <Spacer y={1} />
              <Button shadow color="primary" css={{ marginLeft: "75px" }}>
                Create
              </Button>
            </Grid>
          </Grid.Container>
        </Card>
      </Container>
    </Layout>
  );
}
