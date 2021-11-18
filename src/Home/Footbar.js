import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import styles from './Home.module.css'

export default function Footbar() {
  return (
    <div>
      <Navbar expand="lg" className={styles.footer}>
        <div className={styles.container}>
          <Row>
            <Col lg="3">
              <p className={styles.FooterStrong}>About Us</p>
              <Nav.Link href="https://github.com/Tmax1grp" className={styles.FooterListKR}>[티맥스클라우드/한국품질재단]<br />클라우드 네이티브 애플리케이션<br />개발자 양성 과정 1팀</Nav.Link>
            </Col>
            <Col lg="3">
              <p className={styles.FooterStrong}>Projects</p>
              <Nav.Link href="https://github.com/jjiiiiinie/Module_pjt3_Group1" className={styles.FooterList}>Module Project [2021]</Nav.Link>
              <Nav.Link href="https://github.com/Tmax1grp/Final_project" className={styles.FooterList}>Final Project [2021]</Nav.Link>
            </Col>
            <Col lg="3">
              <p className={styles.FooterStrong}>Contact Us</p>
              <Nav.Link href="https://github.com/jjiiiiinie" className={styles.FooterListKR}>
                <i className="fab fa-github fa-lg" />
                박지은
              </Nav.Link>
              <Nav.Link href="https://github.com/kimkc" className={styles.FooterListKR}>
                <i className="fab fa-github fa-lg" />
                김광채
              </Nav.Link>
              <Nav.Link href="https://github.com/k-ksy" className={styles.FooterListKR}>
                <i className="fab fa-github fa-lg" />
                김성연
              </Nav.Link>
              <Nav.Link href="https://github.com/crosstreet74" className={styles.FooterListKR}>
                <i className="fab fa-github fa-lg" />
                방성호
              </Nav.Link>
              <Nav.Link href="https://github.com/Alexhwang95" className={styles.FooterListKR}>
                <i className="fab fa-github fa-lg" />
                황선호
              </Nav.Link>
            </Col>
            <Col lg={{ span: 2 }}>
              <Navbar.Brand className="align-middle" className={styles.FooterLogo} href="/home" style={{ color: "#FFCA95" }}>NICE TO MEET</Navbar.Brand>
            </Col>
          </Row>
        </div>
      </Navbar>
    </div>
  );
}