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
          <li className="list-group-item">{content}</li>
        </ul>
      </div>
      <div>
        <Row>
          <Col>
            공지사항
            <ClassBoardSummary name="notice" classId={classId}/>
          </Col>
          <Col>
            질문
            <ClassBoardSummary name="discuss" classId={classId}/>
          </Col>
        </Row>
      </div>
    </div>
  );
}