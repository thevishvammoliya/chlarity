import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Navbar, Button, Text, Link } from "@nextui-org/react";
import { auth } from "../firebase-config";
import Cookies from "js-cookie";

export default function HospitalNavbar() {
  const [selectedItem, setSelectedItem] = useState(null);

  const router = useRouter();

  useEffect(() => {
    // Set the active state of the Navbar.Link component based on the current URL
    switch (router.pathname) {
      case "/hospital/viewRequests":
        setSelectedItem("viewRequests");
        break;
      case "/hospital/createRequest":
        setSelectedItem("createRequest");
        break;
      default:
        setSelectedItem(null);
        break;
    }
  }, [router.pathname]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      Cookies.remove("userID");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar variant="static" maxWidth="fluid" disableBlur>
      <Navbar.Brand>
        <a href="/">
          <Text
            h2
            color="inherit"
            hideIn="xs"
            css={{
              fontFamily: "ui-sans-serif",
              textGradient: "45deg, #000046 20%, #1CB5E0 80%",
            }}
          >
            Chlarity
          </Text>
        </a>
      </Navbar.Brand>
      <Navbar.Content activeColor="primary" variant="underline-rounded" hideIn="xs">
        <Navbar.Link
          isActive={selectedItem === "viewRequests"}
          href="/hospital/viewRequests"
        >
          View Requests
        </Navbar.Link>
        <Navbar.Link
          isActive={selectedItem === "createRequest"}
          href="/hospital/createRequest"
        >
          Create Request
        </Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>
          <Button auto flat onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}
