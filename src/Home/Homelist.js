import React, { Fragment, useEffect, useState } from 'react';
import { CardGroup, Card, Modal, Button } from "react-bootstrap";
import axios from 'axios'

export default function Homelist() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const golecture = () => {
    let data = {
      "userName" : sessionStorage.userName
    }
    // window.postMessage ( data , 3001, '*')
  }

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios.get('/classroom-service/lectures/findall')
    .then(res => {
      console.log(res.data)
      setClasses(res.data);
    })
    .catch((err) =>
    console.log(err)
    )
  },[])
  
  const classeslist = classes.map((clas) => {
    return (
      <div>
        <button className="btn btn-outline-primary" style={{margin:"10px"}}>
          <div>
            <p>{clas.name}</p>     
          </div>
        </button>
        <br/>
      </div>
    )
  })

  return (
    <Fragment>
      {/* <button><a href='https://3.17.41.125:5000'>화상회의</a></button>
      <button><a href='http://10.10.20.69:3002/classroom'>채팅</a></button>
      <p>main 양 옆 여백 두기</p> */}
      <button onClick={golecture}><a href="/lecture">강의실</a></button>
      {classeslist}
      <div className="" style={{height:"1000px", width: "80%", justifyContent: "center", alignItems: "center"}}>
        <div className="row">
          <h3 className="col-11">내 강의</h3> 
          <Button className="col-1" variant="primary" onClick={handleShow}>
            강의실 생성
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>강의실 생성</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>강의명</p>
              <input placeholder="강의명을 작성해주세요"/> 
              <p>강의실 이미지</p>
              <Button>등록</Button>
              <Button>삭제</Button>
              <p>강의소개</p>
              <input placeholder="강의소개를 작성해주세요"/> 
              <p>최대 정원</p>
            <Button><i className="fas fa-minus"></i></Button>
            <input placeholder="10"/>
            <Button><i className="fas fa-plus"></i></Button>
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                취소
              </Button>
              <Button variant="primary" onClick={handleClose}>
                생성
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        {/* card */}
        <div className="row">
          <div className="card-content col-3">
            <a className="card-card" href="/classroommain">
              <div className="card-front">
                <div>
                  <h1>React</h1>
                  <p>강사 OOO</p>
                </div>
              </div>
              <div className="card-back">
                <div>
                  <p>React 강의</p>
                  <p>본 강의는 React를 배우고 실습하는 강의입니다...</p>
                  <button className="card-button">강의실 입장</button>
                </div>
              </div>
            </a>
          </div>
          <div className="card-content col-3">
            <a className="card-card" href="#">
              <div className="card-front">
                <div>
                  <h1>Vue</h1>
                  <p>강사 OOO</p>
                </div>
              </div>
              <div className="card-back">
                <div>
                  <p>Vue 강의</p>
                  <p>본 강의는 Vue를 배우고 실습하는 강의입니다...</p>
                  <button className="card-button">강의실 입장</button>
                </div>
              </div>
            </a>
          </div>
        </div>

        

        <div className="row">
          <h3 className="col-11">수강중인 강의</h3> 
          <button className="col-1">수강신청</button>
        </div>
        {/* <CardGroup className="col-2 m-1">
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Spring Boot</Card.Title>
              <Card.Text>
                본 강의는 Spring Boot를 배우고 실습하는 강의입니다...
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">강사 OOO</small>
            </Card.Footer>
          </Card>
        </CardGroup> */}
        
        <h3>종료된 강의</h3>
        {/* <CardGroup className="col-2 m-1">
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>SQL</Card.Title>
              <Card.Text>
                본 강의는 SQL을 배우고 실습하는 강의입니다...
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">강사 OOO</small>
            </Card.Footer>
          </Card>
        </CardGroup> */}
      </div>
    </Fragment>
  );
}