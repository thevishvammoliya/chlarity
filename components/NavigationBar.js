import { Navbar, Button, Text, Link, useTheme } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NavigationBar() {
  const { isDark } = useTheme();
  const [selectedItem, setSelectedItem] = useState(null);
  const router = useRouter();

  useEffect(() => {
    switch (router.pathname) {
      case "/funds":
        setSelectedItem("funds");
        break;
      case "/donate":
        setSelectedItem("donate");
        break;
      case "/#about":
        setSelectedItem("about");
        break;
      case "/#services":
        setSelectedItem("services");
        break;
      default:
        setSelectedItem(null);
        break;
    }
  }, [router.pathname]);

  return (
    <Navbar variant="floating" maxWidth="fluid" disableBlur>
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
      <Navbar.Content hideIn="xs" variant="underline-rounded">
        <Navbar.Link isActive={selectedItem === "funds"} href="/funds">
          Funds
        </Navbar.Link>
        <Navbar.Link isActive={selectedItem === "donate"} href="/donate">
          Donate
        </Navbar.Link>
        <Navbar.Link isActive={selectedItem === "about"} href="/#about">
          About Us
        </Navbar.Link>
        <Navbar.Link isActive={selectedItem === "services"} href="/#services">
          Our Services
        </Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>
          <Button auto shadow as={Link} href="/login">
            Login
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}
