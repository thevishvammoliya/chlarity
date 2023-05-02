import { useState } from "react";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { Container, Text, Textarea, Input, Spacer } from "@nextui-org/react";
import HospitalLayout from "../../components/HospitalLayout";
import { Grid, Button, Card } from "@nextui-org/react";

const CreateRequest = () => {
  const [patientName, setPatientName] = useState("");
  const [treatmentType, setTreatmentType] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    const hospitalId = user ? user.uid : "";

    try {
      // Fetch hospital name from hospitals collection
      const hospitalDoc = await getDoc(doc(db, "hospitals", hospitalId));
      const hospitalName = hospitalDoc.data().name;

      // Add request to requests collection
      const request = await addDoc(collection(db, "requests"), {
        patientName,
        treatmentType,
        hospitalName,
        amount,
        hospitalId,
        status: "Pending",
      });

      console.log("Request added with ID: ", request.id);
      setPatientName("");
      setTreatmentType("");
      setAmount("");
    } catch (error) {
      console.error("Error adding request: ", error);
    }
  };

  return (
    <HospitalLayout>
      <Spacer y={10} />
      <Container justify="center" display="flex">
        <Card css={{ mw: "400px", p: "20px" }}>
          <form onSubmit={handleSubmit}>
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
                <Input
                  label="Patient Name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  fullWidth
                />
                <Input
                  label="Treatment Type"
                  value={treatmentType}
                  onChange={(e) => setTreatmentType(e.target.value)}
                  fullWidth
                />
                <Input
                  label="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  fullWidth
                />
                <Spacer y={1} />
                <Button
                  shadow
                  color="primary"
                  css={{ marginLeft: "75px" }}
                  type="submit"
                >
                  Create
                </Button>
              </Grid>
            </Grid.Container>
          </form>
        </Card>
      </Container>
    </HospitalLayout>
  );
};

export default CreateRequest;
