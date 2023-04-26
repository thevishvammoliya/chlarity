import { Container } from "@nextui-org/react";
import NavBar from "../components/NavigationBar";
import { NextUIProvider, Image } from "@nextui-org/react";
import styles from "../CSS/Layout.module.css";

export default function Layout(props) {
  return (
    <div className={styles.bg}>
      <NextUIProvider>
        <Container>
          <NavBar />
          {props.children}
        </Container>
      </NextUIProvider>
    </div>
  );
}
