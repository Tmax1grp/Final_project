import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ClassBoardSummaryDiscuss from '../widgets/ClassBoardSummaryDiscuss';
import ClassBoardSummaryNotice from '../widgets/ClassBoardSummaryNotice';
import styles from './Board.module.css';

export default function ClassBoardHome({ setActiveKey, setArticleId, setBoardStatus, classId, content }) {

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
          <Col lg={6}>
            <div className={styles.summaryLabel}>
              <label>공지사항</label>
            </div>
            <ClassBoardSummaryNotice setActiveKey={setActiveKey} setArticleId={setArticleId} setBoardStatus={setBoardStatus} classId={classId} />
          </Col>
          <Col lg={6}>
            <div className={styles.summaryLabel}>
              <label>질문</label>
            </div>
            <ClassBoardSummaryDiscuss setActiveKey={setActiveKey} setArticleId={setArticleId} setBoardStatus={setBoardStatus} classId={classId} />
          </Col>
        </Row>
      </div>
    </div>
  );
}