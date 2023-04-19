import { Container } from "@nextui-org/react";
import NavBar from "../components/NavigationBar";
import { NextUIProvider, Image } from "@nextui-org/react";
import style from "./CSS/Layout.module.css";

export default function Layout(props) {
  return (
    <div className={style.bg}>
      <NextUIProvider>
        <Container>
          <NavBar />
          {props.children}
        </Container>
      </NextUIProvider>
    </div>
  );
}
