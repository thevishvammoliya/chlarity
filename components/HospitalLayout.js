import { Container } from "@nextui-org/react";
import { NextUIProvider, Image } from "@nextui-org/react";
import HospitalNavbar from "./HospitalNavbar";
import styles from "../CSS/Layout.module.css";

export default function NGOlayout(props) {
    return (
        <div className={styles.bg}>
            <NextUIProvider>
                <Container>
                    <HospitalNavbar />
                    {props.children}
                </Container>
            </NextUIProvider>
        </div>
    );
}
