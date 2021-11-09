import React, { Fragment, useEffect, useState } from 'react';
import styles from './Home.module.css';
import { CardGroup, Card, Modal, Button } from "react-bootstrap";
import axios from 'axios'

export default function Homelist() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const golecture = () => {
  //   let data = {
  //     "userName" : sessionStorage.userName
  //   }
  //   // window.postMessage ( data , 3001, '*')
  // }

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios.get('/classroom-service/lectures/all')
    .then(res => {
      console.log(res.data)
      setClasses(res.data);
    })
    .catch((err) =>
    console.log(err)
    )
  },[])

  // const makeclsroom = (e) => {
  //   let url = '/classroom-service/lectures'
  //   let data = {
  //     'userId' : sessionStorage.userId,
  //     // 'name' : values.name
  //   }
  //   var config={
  //     header: {
  //       'Content-Type' : 'application/json',
  //     }
  //   }
  //   axios.post(url, data, config)
  //   .then(res => {
  //     console.log("makepost", res.data)
  //     alert("성공")
  //   }).catch(error => {
  //     alert("실패")
  //     console.log(error);
  //   })
  // }

  const classeslist = classes.map((clas) => {
    return (
      <div className="card-content col-xl-3 col-lg-4 col-md-6">
        <a className="card-card" href="/classroommain">
          <div className="card-front" style={{backgroundImage:`url(${"https://picsum.photos/350/400"})`, fontFamily:'OTWelcomeBA'}}>
            <div>
              <h1 style={{color:"white"}}>{clas.name}</h1>
              <p>강사 {clas.userId}</p>
            </div>
          </div>
          <div className="card-back row" style={{backgroundImage:`url(${"https://picsum.photos/350/400"})`}}>
              <h2>{clas.name}</h2>
              <p>{clas.content}</p>
              <button className="card-button"><a href="/classroomain/{clas.classId}">강의실 입장</a></button>
          </div>
        </a>
      </div>
    )
  })

  return (
    <Fragment>
      {/* <button><a href='https://3.17.41.125:5000'>화상회의</a></button> */}
      {/* <button><a href='http://10.10.20.69:3002/classroom'>채팅</a></button> */}
      {/* <button onClick={golecture}><a href="/lecture">openvidu 강의실</a></button> */}
      <br />
      <div className={styles.home_container}>
        <div className="" style={{height:"1000px", width: "80%", justifyContent: "center", alignItems: "center"}}>
          <br />
          <div className="row">
            <h3 className="col-11">내 강의</h3> 
            <button className="col-1" variant="primary" onClick={handleShow}>
              강의실 생성
            </button>
            <Modal show={show} onHide={handleClose} className={styles.modal}>
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
                {/* <Button variant="primary" onClick={makeclsroom()}> */}
                <Button variant="primary">
                  생성
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

          <div className="row">
            {classeslist}
          </div>
          
          <br/>
          <div className="row">
            <h3 className="col-11">수강중인 강의</h3> 
            <button className="col-1">수강신청</button>
          </div>
          <div className="row">
            {classeslist}
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
          <br />
          <h3>종료된 강의</h3>
          <div className="row">
            {classeslist}
          </div>
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
      </div>
    </Fragment>
  );
}