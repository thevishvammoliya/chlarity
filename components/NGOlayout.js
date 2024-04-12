import { Container } from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import NGONavbar from "./NGONavbar";
import styles from "../CSS/Layout.module.css";

export default function NGOlayout(props) {
  return (
    <div className={styles.bg}>
      <NextUIProvider>
        <Container>
          <NGONavbar />
          {props.children}
        </Container>
      </NextUIProvider>
    </div>
  );
}
