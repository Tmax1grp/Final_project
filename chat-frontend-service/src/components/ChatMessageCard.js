import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function ChatMessageCard({ message }) {
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [wdate, setWdate] = useState('');
    const [attach, setAttach] = useState('');

    // TODO: 메시지 데이터의 속성 검사
    useEffect(() => {
        if (message !== undefined) {
            setAuthor(message.fromId);
            setContent(message.chatContent);
            setWdate(message.chatDate);
            // setAttach(message.orgFileName);
        }
        else {
            setAuthor('author');
            setContent('content');
            setWdate('wdate');
        }
    }, [message]);

    return (
        <Row className="justify-content-md-center">
            <Col sm={3}>
                [{wdate}]
            </Col>
            <Col sm={1}>
                {author}:
            </Col>
            <Col sm={3}>
                {content}
            </Col>
            <Col sm={2}>
                {attach}
            </Col>
        </Row>
    );
}