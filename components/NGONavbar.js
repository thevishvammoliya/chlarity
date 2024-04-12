import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Navbar,
  Button,
  Text,
  Link,
} from "@nextui-org/react";
import { auth } from "../firebase-config";
import Cookies from "js-cookie";
import { signOut } from "firebase/auth";


export default function NGONavbar() {
  const [selectedItem, setSelectedItem] = useState(null);

  const router = useRouter();

  useEffect(() => {
    // Set the active state of the Navbar.Link component based on the current URL
    switch (router.pathname) {
      case "/ngo/dashboard":
        setSelectedItem("dashboard");
        break;
      case "/ngo/registerHospital":
        setSelectedItem("registerHospital");
        break;
      case "/ngo/manageHospitals":
        setSelectedItem("manageHospitals");
        break;
      case "/ngo/manageRequests":
        setSelectedItem("manageRequests");
        break;
      case "/ngo/approvedRequests":
        setSelectedItem("approvedRequests");
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
          isActive={selectedItem === "dashboard"}
          href="/ngo/dashboard"
        >
          Dashboard
        </Navbar.Link>
        <Navbar.Link
          isActive={selectedItem === "registerHospital"}
          href="/ngo/registerHospital"
        >
          Register Hospital
        </Navbar.Link>
        <Navbar.Link
          isActive={selectedItem === "manageHospitals"}
          href="/ngo/manageHospitals"
        >
          Manage Hospitals
        </Navbar.Link>
        <Navbar.Link
          isActive={selectedItem === "manageRequests"}
          href="/ngo/manageRequests"
        >
          Manage Requests
        </Navbar.Link>
        <Navbar.Link
          isActive={selectedItem === "approvedRequests"}
          href="/ngo/approvedRequests"
        >
          Approved Requests
        </Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        {/* <Navbar.Item>
          <Dropdown>
            <Dropdown.Button light>Hospitals</Dropdown.Button>
            <Dropdown.Menu>
              <Dropdown.Item variant="shadow">Register Hospital</Dropdown.Item>
              <Dropdown.Button>Manage Hospitals</Dropdown.Button>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Item>
        <Navbar.Item>
          <Dropdown>
            <Dropdown.Button light>Requests</Dropdown.Button>
            <Dropdown.Menu>
              <Dropdown.Item>Manage Requests</Dropdown.Item>
              <Dropdown.Item>Approved Requests</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Item> */}
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>
          <Button auto flat onPress={handleLogout}>
            Logout
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}
