import React from "react";
import { Row, Col, Nav, Tab } from "react-bootstrap";

import Navmenu from "../Home/Navmenu";
import Footbar from "../Home/Footbar";
import AdminLecture from "./AdminLecture";
import AdminMember from "./AdminMember";

import styles from "./Admin.module.css";

export default function Admin({ classId }) {
  return (
    <>
      <Navmenu />
      <div className={styles.AdminContainer} style={{ margin: "auto", alignItems: "center", minHeight: "500px" }}>
        <Tab.Container defaultActiveKey="first">
          <Row>
            <Col sm={2}>
              <div className={styles.MyNav}>
                <Nav className="flex-column">
                  <Nav.Item className={styles.MyNavItem}>
                    <Nav.Link className={styles.sidemenu} eventKey="first">회원 관리</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.MyNavItem}>
                    <Nav.Link className={styles.sidemenu} eventKey="second">강의 관리</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <AdminMember />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <AdminLecture />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
      <Footbar />
    </>
  );
}
