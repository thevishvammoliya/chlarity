import { Container } from '@nextui-org/react';
import NavBar from '../components/NavigationBar';
import { NextUIProvider, Image } from '@nextui-org/react'

export default function Layout(props) {
  return (
    <NextUIProvider>
      <Container css={{ minHeight: '1000px', linearGradient: "45deg, #1CB5E0 20%, #000046 80%" }}>
        <NavBar />
        {props.children}
      </Container>
    </NextUIProvider>
  );
}