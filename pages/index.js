import styles from "../CSS/Landing.module.css";
import { Container } from "@nextui-org/react";
import Layout from "../components/Layout";

function Landing() {
  return (
    <Layout>
      <Container>
        <div className={styles.app}>
          <main className={styles.main}>
            <section id="hero" className={styles.hero}>
              <img
                className={styles.image}
                alt="ether"
                src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDMyODQ3MDk1NGNkYTQwNTEyYjc4OGNhZTMwNDk1YWFlODE5ZjY5OCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/L59aKIC2MFyfUfrz3n/giphy.gif"
              />
              <h2 className={styles.heroTitle}>Donate to Make a Difference</h2>
              <p className={styles.heroDescription}>
                Your contribution can help us make a positive impact in the
                world. Join our cause and help us make a difference.
              </p>
              <a href="/donate">
                <button className={styles.heroButton}>Donate Now</button>
              </a>
            </section>
            <section id="about" className={styles.about}>
              <div className={styles.aboutContainer}>
                <h2 className={styles.sectionTitle}>About Us</h2>
                <div className={styles.aboutContent}>
                  <p>
                    We are a non-profit organization dedicated to improving the
                    lives of people in need. <br />
                    Chlarity is a blockchain-based charity platform that is
                    dedicated to providing charitable funds to those in need of
                    medical treatment. Our mission is to bring transparency and
                    security to the charity industry, and to make it easy for
                    donors to contribute to worthy causes.
                  </p>
                  <p>
                    Chlarity's use of blockchain technology allows us to create
                    a transparent and secure platform for charitable giving. By
                    using a decentralized system, we can ensure that all
                    transactions are transparent and that donations are used for
                    their intended purpose.
                  </p>
                </div>
              </div>
            </section>
            <section id="services" className={styles.services}>
              <h2 className={styles.sectionTitle}>Our Services</h2>
              <ul className={styles.servicesList}>
                <li>Medical Treatment Aid</li>
                <li>Hospitalization Expenses Aid</li>
                <li>Medication Aid</li>
                <li>Diagnostic Tests and Procedures Aid</li>
              </ul>
            </section>
          </main>
          <footer className={styles.footer}>
            <p>&copy; 2023 CHLARITY</p>
          </footer>
        </div>
      </Container>
    </Layout>
  );
}

export default Landing;
