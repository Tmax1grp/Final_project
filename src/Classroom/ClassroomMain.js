import React, { useEffect, useState } from 'react';
import { Row, Col, Nav, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Navmenu from '../Home/Navmenu';
import Footbar from '../Home/Footbar';
import ClassHeader from '../layout/ClassHeader';
import ClassBoardHome from '../Board/ClassBoardHome'
import ClassBoardNotice from '../Board/ClassBoardNotice'
import ClassBoardCurriculum from '../Board/ClassBoardCurriculum'
import ClassBoardAssignment from '../Board/ClassBoardAssignment'
import ClassBoardDiscuss from '../Board/ClassBoardDiscuss'
import ClassBoardReference from '../Board/ClassBoardReference'
import ClassMemberManage from '../widgets/ClassMemberManage'
import styles from '../layout/Class.module.css'
import BoardArticleView from '../Board/BoardArticleView'

export default function ClassroomMain() {

  // url에서 현재 classId 가져옴
  const classId = window.location.pathname.split('/')[2];
  const [ clsname, setClsnames ] = useState([]);
  const [ teacher, setTeacher ] = useState([]);
  const [ content, setContent ] = useState([]);
  const [ status, setStatus] = useState([]);
  const [activeKey, setActiveKey] = useState("home"); // activeKey: sidebar(tab)에서 현재 선택된 key value

  const [boardStatus, setBoardStatus] = useState(0); // boardStatus: 0.리스트, 1.글 내용, 2.글 작성, 3. 글 수정
  const [articleId, setArticleId] = useState(0); // articleId: 조회할 게시글의 번호 (noticeId, assignmentId, discussId, referenceId)

  // sidebar(tab) 선택 handler
  const handleSelected = key => {
    // console.log(key);
    setActiveKey(key);
    setBoardStatus(0);
  }

  useEffect(() => {
    axios.get('/classroom-service/lectures/all',
      {params: {userId: sessionStorage.userId}})
      .then(res => {
        var cnt = 0
        while (res.data.length !== 0) {
          if (res.data[cnt].classroomId == classId){
            setClsnames(res.data[cnt].name)
            setTeacher(res.data[cnt].teacher)
            setContent(res.data[cnt].content)
            setStatus(res.data[cnt].status)
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
      <div className={styles.clsroomcontainer} style={{minHeight:"600px"}}>
        <ClassHeader classId={classId} clsname={clsname} teacher={teacher} />
        <Tab.Container
          activeKey={activeKey}
          defaultActiveKey={activeKey}
          onSelect={handleSelected}
        >
          <Row>
            <Col xl={2} sm={2}>
              <div className={styles.MyNav}>
                <Nav className="flex-column">
                  <Nav.Item className={styles.MyNavItem}>
                    <Nav.Link eventKey="home" className={styles.sidemenu}>홈</Nav.Link>
                  </Nav.Item>
                  {/* <Nav.Item>
                    <Nav.Link eventKey="curr" className={styles.sidemenu}>강의커리큘럼</Nav.Link>
                  </Nav.Item> */}
                  <Nav.Item className={styles.MyNavItem}>
                    <Nav.Link eventKey="notice" className={styles.sidemenu}>공지사항</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.MyNavItem}>
                    <Nav.Link eventKey="assignment" className={styles.sidemenu}>과제게시판</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.MyNavItem}>
                    <Nav.Link eventKey="discuss" className={styles.sidemenu}>질문게시판</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles.MyNavItem}>
                    <Nav.Link eventKey="reference" className={styles.sidemenu}>자료게시판</Nav.Link>
                  </Nav.Item>
                  {
                    status === 5 ?
                      <Nav.Item>
                        <Nav.Link eventKey="수강생관리" className={styles.sidemenu}>수강생관리</Nav.Link>
                      </Nav.Item>
                      : <></>
                  }
                </Nav>
              </div>
            </Col>
            <Col xl={10} sm={10}>
              <Tab.Content>
                <BoardArticleView activeKey={activeKey} classId={classId} articleId={articleId} boardStatus={boardStatus} setBoardStatus={setBoardStatus} />
                {
                  boardStatus == 0 ?
                    <>
                      <Tab.Pane eventKey="home">
                        <ClassBoardHome setActiveKey={setActiveKey} setArticleId={setArticleId} setBoardStatus={setBoardStatus} classId={classId} content={content}/>
                      </Tab.Pane>
                      <Tab.Pane eventKey="notice">
                        <ClassBoardNotice setBoardStatus={setBoardStatus} setArticleId={setArticleId} classId={classId} status={status}/>
                      </Tab.Pane>
                      <Tab.Pane eventKey="assignment">
                        <ClassBoardAssignment setBoardStatus={setBoardStatus} setArticleId={setArticleId} classId={classId} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="discuss">
                        <ClassBoardDiscuss setBoardStatus={setBoardStatus} setArticleId={setArticleId} classId={classId} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="reference">
                        <ClassBoardReference setBoardStatus={setBoardStatus} setArticleId={setArticleId} classId={classId} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="수강생관리">
                        <ClassMemberManage classId={classId} />
                      </Tab.Pane>
                    </>
                    :
                    <></>
                }
              </Tab.Content>
            </Col >
          </Row >
          {/* <ClassBoardList /> */}
        </Tab.Container >
      </div >
      <Footbar />
    </div >
  );
}