import React, { useState, useEffect } from "react";
import { Row, Col, Nav, Tab } from "react-bootstrap";

import Navmenu from "../Home/Navmenu";
import Footbar from "../Home/Footbar";
import MypageDetail from "./MypageDetail";
import MypageLecture from "./MypageLecture";

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
      <div className="container" style={{alignItems:"center"}}>
        <Tab.Container
          activeKey={activeKey}
          id="left-tabs-example"
          defaultActiveKey="first"
          onSelect={handleTabSelect}
        >
          <Row>
            <Col sm={3}>
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="members">개인정보 관리</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="classes">수강중인 강의</Nav.Link>
                </Nav.Item>
              </Nav>
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
