import { Navbar, Button, Text, Link, useTheme } from "@nextui-org/react";
export default function NavigationBar() {
  const { isDark } = useTheme();
  return (
    <Navbar variant="floating" isBordered={isDark} disableBlur>
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
      <Navbar.Content hideIn="xs">
        <Navbar.Link href="/funds">Funds</Navbar.Link>
        <Navbar.Link href="/donate">Donate</Navbar.Link>
        <Navbar.Link href="/#about">About Us</Navbar.Link>
        <Navbar.Link href="/#services">Our Services</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        {/* <Navbar.Link color="inherit" href="/login">
          Login
        </Navbar.Link> */}
        <Navbar.Item>
          <Button auto shadow as={Link} href="/login">
            Login
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}
