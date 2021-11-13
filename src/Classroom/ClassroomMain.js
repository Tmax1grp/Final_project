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
  const [ clsname, setClsnames ] = useState([]);
  const [ teacher, setTeacher ] = useState([]);
  const [ content, setContent ] = useState([]);
  
  useEffect(() => {
    axios.get('/classroom-service/lectures/all',
    {params: {userId: sessionStorage.userId}})
    .then(res => {
      var cnt = 0
       console.log(res.data)
      while (res.data.length !== 0) {
        if (res.data[cnt].classroomId == classId){
          setClsnames(res.data[cnt].name)   
          setTeacher(res.data[cnt].userName)   
          setContent(res.data[cnt].content)   
          break;
        } else {
          cnt += 1
        }
      }
    }).catch(err => console.log(err))
  }, [])

  return (
    <div>
      <Navmenu />
      <div className={styles.clsroomcontainer}>
        <ClassHeader classId={classId} clsname={clsname} teacher={teacher} />
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
                <Nav.Item>
                  <Nav.Link eventKey="seventh" className={styles.sidemenu}>수강생관리</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col xl={10} sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <ClassBoardHome classId={classId} content={content}/>
                </Tab.Pane>
                {/* <Tab.Pane eventKey="second">
                  <ClassBoardCurriculum content={clsname.content}/>
                </Tab.Pane> */}
                <Tab.Pane eventKey="third">
                  <ClassBoardNotice classId={classId} />
                </Tab.Pane>
                <Tab.Pane eventKey="fourth">
                  <ClassBoardHomework classId={classId} />
                </Tab.Pane>
                <Tab.Pane eventKey="fifth">
                  <ClassBoardDiscuss classId={classId} />
                </Tab.Pane>
                <Tab.Pane eventKey="sixth">
                  <ClassBoardResource classId={classId} />
                </Tab.Pane>
                <Tab.Pane eventKey="seventh">
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