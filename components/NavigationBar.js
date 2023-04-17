import { Navbar, Button, Image, Avatar, Text, Link } from "@nextui-org/react";
export default function NavigationBar() {
    return (
        <Navbar variant="floating" disableBlur>
            <Navbar.Brand>
                <a href="/">
                    <Text h2 color="inherit" hideIn="xs" css={{ fontFamily: 'ui-sans-serif', textGradient: "45deg, #000046 20%, #1CB5E0 80%" }}>
                        Chlarity
                    </Text>
                </a>
            </Navbar.Brand>
            <Navbar.Content hideIn="xs">
                <Navbar.Link href="/funds">Funds</Navbar.Link>
                <Navbar.Link href="/donate">Donate</Navbar.Link>
                <Navbar.Link href="#">Contact Us</Navbar.Link>
                <Navbar.Link href="#">About Us</Navbar.Link>
            </Navbar.Content>
            <Navbar.Content>
                <Navbar.Link color="inherit" href="/login">
                    Login
                </Navbar.Link>
                <Navbar.Item>
                    <Button auto flat as={Link} href="/signup">
                        Sign Up
                    </Button>
                </Navbar.Item>
            </Navbar.Content>
        </Navbar>
    );
}