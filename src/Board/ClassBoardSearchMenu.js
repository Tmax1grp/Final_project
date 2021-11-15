import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

export default function ClassBoardSearchMenu({ keyword, setKeyword }) {
    const [values, setValues] = useState();
    const handleChange = e => {
        setValues({
            ...values,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = () => {
        if (values.keywordValue !== null)
            setKeyword({
                ...values
            })
        else {
            alert("검색 키워드를 입력해주세요!");
        }
    }

    useEffect(() => {
        setValues({
            ...keyword
        })
    }, [])

    return (
        <>
            <Row className="justify-content-end">
                <Col md={{ span: 2, offset: 6 }}>
                    <Form.Group controlId="keywordType">
                        <Form.Select defaultValue={0} onChange={handleChange}>
                            <option value={0}>작성자</option>
                            <option value={1}>제목</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group controlId="keywordValue" onChange={handleChange}>
                        <Form.Control className="pr-0" type="text" />
                    </Form.Group>
                </Col>
                <Col md={1}>
                    <button className="writebutton mt-1 p-0" onClick={handleSubmit}><i className="fas fa-search fa-lg"></i></button>
                </Col>
            </Row>
        </>
    );
}