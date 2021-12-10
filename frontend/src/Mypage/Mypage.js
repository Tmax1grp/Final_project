import React, { useState, useEffect } from "react";
import { Row, Col, Nav, Tab } from "react-bootstrap";

import Navmenu from "../Home/Navmenu";
import Footbar from "../Home/Footbar";
import MypageDetail from "./MypageDetail";
import MypageLecture from "./MypageLecture";
import styles from './Mypage.module.css';

export default function Mypage({ propKey }) {
  const [activeKey, setActiveKey] = useState("members");
  const handleTabSelect = (key) => {
    setActiveKey(key);
  };

  useEffect(() => {
    // console.log(propKey);
    if (typeof propKey === undefined) setActiveKey("members");
  }, [propKey]);

  return (
    <>
      <Navmenu />
      <div className={styles.container} style={{margin: "auto", alignItems:"center", minHeight:"500px"}}>
        <Tab.Container
          activeKey={activeKey}
          defaultActiveKey="first"
          onSelect={handleTabSelect}
        >
          <Row>
            <Col sm={3}>
              <div className={styles.MyNav}>
                <Nav className="flex-column">
                  <Nav.Item className={styles.MyNavItem}>
                    <Nav.Link className={styles.sidemenu} eventKey="members">개인정보 관리</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.MyNavItem}>
                    <Nav.Link className={styles.sidemenu} eventKey="classes">강의 관리</Nav.Link>
                  </Nav.Item>
              </Nav>
              </div>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="members">
                  <MypageDetail />
                </Tab.Pane>
                <Tab.Pane eventKey="classes">
                  <MypageLecture />
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
