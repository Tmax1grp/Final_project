import React from 'react';
import { Row, Col, Nav, Tab } from 'react-bootstrap';

import Navmenu from '../Home/Navmenu';
import Footbar from '../Home/Footbar';
import MyInfoDetail from './MyInfoDetail';
import MyInfoLecture from './MyInfoLecture';

export default function MyInfo() {

    // 삭제요
    // sessionStorage.setItem('email', 'user1@study.com')
    // sessionStorage.setItem('userId', 24)
    // sessionStorage.setItem('userName', '사용자1')
    // sessionStorage.setItem('tel', '010-1111-1111')

    return (
        <>
            <Navmenu />
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">개인정보 관리</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">수강중인 강의</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <MyInfoDetail />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <MyInfoLecture />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            <Footbar />
        </>
    );
}