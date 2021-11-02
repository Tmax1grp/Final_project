import React, { Fragment, useState } from 'react';
import { CardGroup, Card, Modal, Button } from "react-bootstrap";

import Navbar from './Navbar';
import Footbar from './Footbar';

export default function Home() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <Navbar />
      <div style={{height:"1000px"}}>
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
        <a>
          <CardGroup className="col-4 m-1">
            <Card>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>React</Card.Title>
                <Card.Text>
                  본 강의는 React를 배우고 실습하는 강의입니다...
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">강사 OOO</small>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>Vue</Card.Title>
                <Card.Text>
                  본 강의는 Vue를 배우고 실습하는 강의입니다...
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">강사 OOO</small>
              </Card.Footer>
            </Card>
          </CardGroup>
        </a>
        <div className="row">
          <h3 className="col-11">수강중인 강의</h3> 
          <button className="col-1">수강신청</button>
        </div>
        <CardGroup className="col-2 m-1">
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
        </CardGroup>
        
        <h3>종료된 강의</h3>
        <CardGroup className="col-2 m-1">
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
        </CardGroup>
      </div>
      <Footbar />
    </Fragment>
  );
}