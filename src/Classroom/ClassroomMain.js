import React from 'react';
import { Row, Col, Container, Nav, Tab } from 'react-bootstrap';

import Navmenu from '../Home/Navmenu';
import Footbar from '../Home/Footbar';
import ClassHeader from '../layout/ClassHeader';
import ClassBoardHome from '../Board/ClassBoardHome'
import ClassBoardNotice from '../Board/ClassBoardNotice'
import ClassBoardIndex from '../Board/ClassBoardIndex'
import ClassBoardHomework from '../Board/ClassBoardAssignment'
import ClassBoardDiscuss from '../Board/ClassBoardDiscuss'
import ClassBoardResource from '../Board/ClassBoardReference'

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
                <Nav.Link eventKey="first">홈</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">공지사항</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">강의커리큘럼</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth">과제게시판</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fifth">질문게시판</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="sixth">자료게시판</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <ClassBoardHome />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <ClassBoardNotice />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <ClassBoardIndex />
              </Tab.Pane>
              <Tab.Pane eventKey="fourth">
                <ClassBoardHomework />
              </Tab.Pane>
              <Tab.Pane eventKey="fifth">
                <ClassBoardDiscuss />
              </Tab.Pane>
              <Tab.Pane eventKey="sixth">
                <ClassBoardResource />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <Footbar />
    </>
  );
}