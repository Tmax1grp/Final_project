import React, { useEffect, useState } from 'react';
import { Row, Col, Nav, Tab } from 'react-bootstrap';
import axios from 'axios';

import Navmenu from '../Home/Navmenu';
// import Footbar from '../Home/Footbar';
import ClassHeader from '../layout/ClassHeader';
import ClassBoardHome from '../Board/ClassBoardHome'
import ClassBoardNotice from '../Board/ClassBoardNotice'
import ClassBoardCurriculum from '../Board/ClassBoardCurriculum'
import ClassBoardHomework from '../Board/ClassBoardAssignment'
import ClassBoardDiscuss from '../Board/ClassBoardDiscuss'
import ClassBoardResource from '../Board/ClassBoardReference'
// import ClassBoardList from '../widgets/ClassBoardList';
import ClassMemberManage from '../widgets/ClassMemberManage'
import styles from '../layout/Class.module.css'

export default function ClassroomMain() {

  const classId = window.location.pathname.split('/')[2];
  const [clsname, setClsname] = useState([]);
  const [activeKey, setActiveKey] = useState("home");

  useEffect(() => {
    axios.get('/classroom-service/lectures/all')
      .then(res => {
        var cnt = 0
        while (res.data.length !== 0) {
          if (res.data[cnt].classId == classId) {
            break;
          } else {
            cnt += 1
          }
        }
        setClsname(res.data[cnt]);
      }).catch(err => console.log(err))
  }, [])

  return (
    <div>
      <Navmenu />
      <div className={styles.clsroomcontainer}>
        <ClassHeader classId={classId} clsname={clsname.name} teacher={clsname.userName} />
        <Tab.Container
          defaultActiveKey={activeKey}
          onSelect={(k) => setActiveKey(k)}
        >
          <Row>
            <Col xl={2} sm={2}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="home" className={styles.sidemenu}>홈</Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                  <Nav.Link eventKey="curr" className={styles.sidemenu}>강의커리큘럼</Nav.Link>
                </Nav.Item> */}
                <Nav.Item>
                  <Nav.Link eventKey="notice" className={styles.sidemenu}>공지사항</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="homework" className={styles.sidemenu}>과제게시판</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="qna" className={styles.sidemenu}>질문게시판</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="material" className={styles.sidemenu}>자료게시판</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="members" className={styles.sidemenu}>수강생관리</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col xl={10} sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="home">
                  <ClassBoardHome classId={classId} content={clsname.content} />
                </Tab.Pane>
                {/* <Tab.Pane eventKey="curr">
                  <ClassBoardCurriculum content={clsname.content}/>
                </Tab.Pane> */}
                <Tab.Pane eventKey="notice">
                  <ClassBoardNotice classId={classId} />
                </Tab.Pane>
                <Tab.Pane eventKey="homework">
                  <ClassBoardHomework classId={classId} />
                </Tab.Pane>
                <Tab.Pane eventKey="qna">
                  <ClassBoardDiscuss classId={classId} />
                </Tab.Pane>
                <Tab.Pane eventKey="material">
                  <ClassBoardResource classId={classId} />
                </Tab.Pane>
                <Tab.Pane eventKey="members">
                  <ClassMemberManage classId={classId} />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
          {/* <ClassBoardList /> */}
        </Tab.Container>
      </div>
      {/* <Footbar /> */}
    </div>
  );
}