import React, { Fragment, useEffect, useState } from 'react';
import styles from './Home.module.css';
// import { CardGroup, Card, Modal, Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import axios from 'axios'
// import ClassroomMain from '../Classroom/ClassroomMain';
import { Link } from 'react-router-dom';
export default function Homelist() {

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [cls, setCls] = useState([]);
  const [makecls, setMakeclses] = useState({
    clsName : '',
    clscontent : '',
    clsparticipantNum: 0
  });
  const [ incls, setIncls ] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true);
  const handleClose2 = () => setShow2(false);

  useEffect(() => {
    axios.get('/classroom-service/lectures/all', 
      {params: {userId: sessionStorage.userId}})
    .then(res => {
      setCls(res.data);
    })
    .catch((err) =>
    console.log(err)
    )
  },[])
    
  const handleChangeForm = (e) => {
    setMakeclses({
      ...makecls,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeForm2 = (e) => {
    setIncls(e.target.value)
  }
  
  const makeclsroom = () => {
    let url = '/classroom-service/lectures'
    let data = {
      'userId' : sessionStorage.userId,
      'userName' : sessionStorage.userName,
      'name' : makecls.clsName,
      'content' : makecls.clscontent,
      'participantNum': makecls.clsparticipantNum
    }
    var config={
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': sessionStorage.token
      }
    }
    axios.post(url, data, config)
    .then(res => {
      alert("강의실 생성 성공")
      setShow(false)
    }).catch(error => {
      alert("실패")
      console.log(error);
    })
  }

  const enterCls = () => {
    axios.post('/lecture-service/students', 
    null, {
      params: {
        userId: sessionStorage.userId,
        userName: sessionStorage.userName,
        classroomId: incls
    }}
    )
    .then(res => {
      alert("수강신청 성공")
      setShow(false)
    }).catch(error => {
      alert("실패")
      console.log(error);
    })
  }
  
  return (
    <Fragment>
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
              <form>
                <Modal.Header closeButton>
                  <Modal.Title>강의실 생성</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* <label>강의명</label> */}
                    <p>강의명</p>
                    <input type="text" name="clsName" placeholder="강의명을 작성해주세요" value={makecls.clsName} onChange={handleChangeForm}/>
                    {/* <p>강의실 이미지</p>
                    <button>등록</button>
                    <button>삭제</button> */}
                    <p>강의소개</p>
                    <input type="text" name="clscontent" placeholder="강의소개를 작성해주세요" value={makecls.clscontent} onChange={handleChangeForm}/> 
                    <p>최대 정원</p>
                    <input type="text" name="clsparticipantNum" placeholder="숫자만 작성해주세요" value={makecls.clsparticipantNum} onChange={handleChangeForm}/>
                </Modal.Body>
                <Modal.Footer>
                  <button onClick={handleClose}>
                    취소
                  </button>
                  <button onClick={makeclsroom}>
                    생성
                  </button>
                </Modal.Footer>
              </form>
            </Modal>
          </div>
          <div className="row">
            {/* {clslist} */}
            { 
              cls.map(item => (
                item.status == 5 ?
                <div className="card-content col-xl-3 col-lg-4 col-md-6">
                  <Link className="card-card" to={`/classroommain/${item.classroomId}`} params={item.classId}>
                    <div className="card-front" style={{backgroundImage:`url(${"https://picsum.photos/350/400"})`, fontFamily:'OTWelcomeBA'}}>
                      <div>
                        <h1 style={{color:"white"}}>{item.name}</h1>
                        <p>[강사] {item.userName}</p>
                      </div>
                    </div>
                    <div className="card-back row" style={{backgroundImage:`url(${"https://picsum.photos/350/400"})`}}>
                        <h2>{item.name}</h2>
                        <p>[소개] {item.content}</p>
                        <button className="card-button"><a href="/classroomain/{clas.classId}">강의실 입장</a></button>
                    </div>
                  </Link>
                </div> 
              : null ) 
            )}
          </div>

          <br/>
          <div className="row">
            <h3 className="col-11">수강중인 강의</h3> 
            <button className="col-1" variant="primary" onClick={handleShow2}>
            수강신청
            </button>
            <Modal show={show2} onHide={handleClose2} className={styles.modal}>
              <form>
                <Modal.Header closeButton>
                  <Modal.Title>수강신청</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>강의실 번호</p>
                  <input type="text" name="incls" placeholder="수강신청할 강의실 번호를 작성해주세요." value={incls} onChange={handleChangeForm2}/>
                </Modal.Body>
                <Modal.Footer>
                  <button onClick={handleClose2}>
                    취소
                  </button>
                  <button onClick={enterCls}>
                    신청
                  </button>
                </Modal.Footer>
              </form>
            </Modal>
          </div>
          <div className="row">
            { 
              cls.map(item => (
                item.status == 1 ?
                <div className="card-content col-xl-3 col-lg-4 col-md-6">
                  <Link className="card-card" to={`/classroommain/${item.classId}`} params={item.classId}>
                    <div className="card-front" style={{backgroundImage:`url(${"https://picsum.photos/350/400"})`, fontFamily:'OTWelcomeBA'}}>
                      <div>
                        <h1 style={{color:"white"}}>{item.name}</h1>
                        <p>[강사] {item.userId}</p>
                      </div>
                    </div>
                    <div className="card-back row" style={{backgroundImage:`url(${"https://picsum.photos/350/400"})`}}>
                        <h2>{item.name}</h2>
                        <p>[소개] {item.content}</p>
                        <button className="card-button"><a href="/classroomain/{clas.classId}">강의실 입장</a></button>
                    </div>
                  </Link>
                </div> 
              : null ) 
            )}
          </div>
          <br />
          <h3>종료된 강의</h3>
          <div className="row">
            {/* {clslist} */}
            <h1 style={{color:"grey"}}>종료된 강의가 없습니다.</h1>
          </div>
        </div>
      </div>
    </Fragment>
  );
}