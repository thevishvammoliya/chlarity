import {
  Navbar,
  Button,
  Image,
  Avatar,
  Text,
  Link,
  Dropdown,
  Popover,
  Card,
} from "@nextui-org/react";
export default function NGONavbar() {
  return (
    <Navbar variant="floating" disableBlur>
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
      <Navbar.Content>
        <Navbar.Link color="inherit" href="/hospital/viewRequests">
          Veiw Requests
        </Navbar.Link>
        <Navbar.Link color="inherit" href="/hospital/createRequest">
          Create Request
        </Navbar.Link>
        {/* <Popover>
          <Popover.Trigger>
            <Avatar text="Hospital" color="primary" textColor="white" as={Button} />
          </Popover.Trigger>
          <Popover.Content>
            <Button light as={Link} href="/">
              Logout
            </Button>
          </Popover.Content>
        </Popover> */}
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>
          <Button auto flat as={Link} href="/">
            Logout
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}
