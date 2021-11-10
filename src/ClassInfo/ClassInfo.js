import React from 'react';
import { Row, Col, Nav, Tab } from 'react-bootstrap';

import Navmenu from '../Home/Navmenu';
import Footbar from '../Home/Footbar';
import ClassHeader from '../layout/ClassHeader';
import AdminLecture from './ClassInfoDetail'
import AdminMember from './ClassInfoMember'

export default function ClassroomMain({ classId }) {
    return (
        <>
            <Navmenu />
            <ClassHeader classId={classId} />
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={2}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">강의 관리</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">회원 관리</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <AdminLecture />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <AdminMember />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            <Footbar />
        </>
    );
}