import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

export default function MyInfoDetail() {
    const [info, setInfo] = useState({
        email: '',
        userId: '',
        userName: '',
        tel: '',
        password: '',
        passwordCheck: ''
    });

    const handleChange = (event) => {
        setInfo({
            ...info,
            [event.target.id]: event.target.value
        })
        console.log(info);
    }

    const handleSubmit = event => {
        console.log("[사용자 업데이트]: ", info.userId);
        console.log(info);
        // axios.post();
    }

    useEffect(() => {
        setInfo({
            email: sessionStorage.getItem('email'),
            userId: sessionStorage.getItem('userId'),
            userName: sessionStorage.getItem('userName'),
            tel: sessionStorage.getItem('tel')
        })
    }, [])

    return (
        <>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="userId">
                    <Form.Label column sm="4">
                        회원ID
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" readOnly defaultValue={info.userId} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="userName">
                    <Form.Label column sm="4">
                        회원이름
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={info.userName} onChange={handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="email">
                    <Form.Label column sm="4">
                        회원이메일
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="email" defaultValue={info.email} onChange={handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="tel">
                    <Form.Label column sm="4">
                        회원전화번호
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="tel" defaultValue={info.tel} onChange={handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="date">
                    <Form.Label column sm="4">
                        회원가입일
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="date" readOnly defaultValue={info.createDate} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="password">
                    <Form.Label column sm="4">
                        비밀번호
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="password" onChange={handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="passwordCheck">
                    <Form.Label column sm="4">
                        비밀번호 확인
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="password" onChange={handleChange} />
                    </Col>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    개인정보 수정 확인
                </Button>
            </Form>
        </>
    );
}