import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ClassBoardSummary from '../widgets/ClassBoardSummary';

export default function ClassBoardHome() {
  return (
    <Container>
      <Row>
        <Col>
          <ClassBoardSummary name="notice" />
        </Col>
        <Col>
          <ClassBoardSummary name="discuss" />
        </Col>
      </Row>
    </Container>
  );
}