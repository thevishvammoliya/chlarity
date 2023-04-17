import { Container } from '@nextui-org/react';
import { NextUIProvider, Image } from '@nextui-org/react'
import NGONavbar from './NGONavbar';

export default function NGOlayout(props) {
  return (
    <NextUIProvider>
      <Container css={{ minHeight: '1000px', linearGradient: "45deg, #1CB5E0 20%, #000046 80%" }}>
        <NGONavbar />
        {props.children}
      </Container>
    </NextUIProvider>
  );
}