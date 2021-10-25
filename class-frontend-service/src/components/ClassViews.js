/*
ClassPage.js
- 강의실 메인 view
*/

import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import ClassBoard from './layout/ClassBoard';
import ClassSidebar from './layout/ClassSidebar';
import ClassHeader from './layout/ClassHeader';

export default function ClassViews({ classId }) {
    // activeBoard: 현재 활성화된 게시판 일련번호
    // * (0: 홈 [Default], 1: 공지사항, 2: 강의 커리큘럼, 3: 과제 게시판, 4: 질문 게시판, 5: 자료 게시판)
    const [activeBoard, setActiveBoard] = useState(0);
    return (
        <>
            <ClassHeader />
            <Container>
                <Row>
                    <Col>
                        <ClassSidebar setActiveBoard={setActiveBoard} />
                    </Col>
                    <Col>
                        <ClassBoard classId={classId} activeBoard={activeBoard} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}