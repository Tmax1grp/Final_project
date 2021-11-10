import React from 'react';
import { Row, Col, Nav, Tab } from 'react-bootstrap';

import Navmenu from '../Home/Navmenu';
import Footbar from '../Home/Footbar';
import AdminLecture from './AdminLecture';
import AdminMember from './AdminMember';

export default function ClassroomMain({ classId }) {
    return (
        <>
            <Navmenu />
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">회원 관리</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">강의 관리</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
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
            <Footbar />
        </>
    );
}