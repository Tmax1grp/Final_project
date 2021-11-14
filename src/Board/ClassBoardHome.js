import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ClassBoardSummary from '../widgets/ClassBoardSummary';

export default function ClassBoardHome({classId, content}) {

  return (
    <div>
      <div className="card">
        <div className="card-header">
          강의소개
        </div>
        <ul className="list-group list-group-flush">
          {
            content == '' ? 
            <p>강의소개가 없습니다.</p>
          : <li className="list-group-item">{content}</li>
          }
        </ul>
      </div>
      <div>
        <Row>
          <Col>
            <label>공지사항</label> 
            <ClassBoardSummary name="notice" classId={classId}/>
          </Col>
          <Col>
            <label>질문</label> 
            <ClassBoardSummary name="discuss" classId={classId}/>
          </Col>
        </Row>
      </div>
    </div>
  );
}