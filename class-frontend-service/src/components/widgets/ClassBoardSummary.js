import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

export default function ClassBoardSummary({ name }) {

    const [articles, setArticles] = useState(null);

    useEffect(() => {
        let res;
        // TODO: props로 넘겨받은 'name' 게시판의 게시글 목록 GET
        // axios.get(https://localhost:55000)
        if (name === "notice")
            ; // res = [];
        else if (name === "discuss")
            ; // res = [];
        else
            alert("ERROR: Invalid summary name");
        // TODO: GET한 데이터 slicing (가장 늦은 게시글 2개의 제목, 작성자, 내용)
        // setArticles(res);
    }, [name])

    return (
        <div>
            <h2>{name}</h2>
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title>
                                <Card.Link href="#">Article Link</Card.Link>
                            </Card.Title>
                        </Col>
                        <Col>
                            <Card.Subtitle className="text-muted">Author</Card.Subtitle>
                        </Col>
                    </Row>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}