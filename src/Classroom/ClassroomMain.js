import React, { useEffect, useState } from 'react';
import { Row, Col, Nav, Tab } from 'react-bootstrap';
import reactDom from 'react-dom';

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
import styles from '../layout/Class.module.css'

export default function ClassroomMain() {

  const classId = window.location.pathname.split('/')[2];
  const [ clsname, setClsname ] = useState([]);
  
  useEffect(() => {
    axios.get('/classroom-service/lectures/all')
    .then(res => {
      var cnt = 0
      while (res.data.length !== 0) {
        if (res.data[cnt].classId == classId){
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
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col xl={2} sm={2}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first" className={styles.sidemenu}>홈</Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                  <Nav.Link eventKey="second" className={styles.sidemenu}>강의커리큘럼</Nav.Link>
                </Nav.Item> */}
                <Nav.Item>
                  <Nav.Link eventKey="third" className={styles.sidemenu}>공지사항</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fourth" className={styles.sidemenu}>과제게시판</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fifth" className={styles.sidemenu}>질문게시판</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="sixth" className={styles.sidemenu}>자료게시판</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col xl={10} sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <ClassBoardHome classId={classId} content={clsname.content}/>
                </Tab.Pane>
                {/* <Tab.Pane eventKey="second">
                  <ClassBoardCurriculum content={clsname.content}/>
                </Tab.Pane> */}
                <Tab.Pane eventKey="third">
                  <ClassBoardNotice classId={classId}/>
                </Tab.Pane>
                <Tab.Pane eventKey="fourth">
                  <ClassBoardHomework classId={classId}/>
                </Tab.Pane>
                <Tab.Pane eventKey="fifth">
                  <ClassBoardDiscuss classId={classId}/>
                </Tab.Pane>
                <Tab.Pane eventKey="sixth">
                  <ClassBoardResource classId={classId}/>
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