import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

export default function MyInfoDetail() {
    const [info, setInfo] = useState({
        email: '',
        userId: '',
        userName: '',
        tel: '',
        password: '',
        passwordCheck: ''
    });
    const [quitVisible, setQuitVisible] = useState(false);
    const showQuitModal = () => setQuitVisible(true);
    const closeQuitModal = () => setQuitVisible(false);
    const userId = sessionStorage.getItem('userId');

    const handleChange = event => {
        setInfo({
            ...info,
            [event.target.id]: event.target.value
        })
        // console.log(info);
    }

    // TODO: 입력된 값 확인
    const handleSubmit = () => {
        console.log("[사용자 업데이트]: ", info.userId);
        console.log(info);
        axios.put(`http://localhost:8000/mypage/${userId}`, null, {
            params: {
                password: info.password,
                userName: info.userName,
                tel: info.tel
            }
        });
        // event.preventDefault();
    }


    const handleQuitSubmit = () => {
        console.log("[사용자 탈퇴]: ", info.userId);
        console.log(info);
        axios.delete(`http://localhost:8000/mypage/${userId}`);
        // closeQuitModal();
        // redirect to main page
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('userId')
        sessionStorage.removeItem('userName')
        sessionStorage.removeItem('tel')
        document.location.href = '/'
    }

    useEffect(() => {
        if (userId != null) {
            console.log('axios.get-user')
            axios.get(`http://localhost:8000/mypage/${userId}`)
                .then(res => {
                    // console.log(res.data);
                    setInfo(res.data);
                    // console.log(info);
                })
        }
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
            <Button variant="danger" className="mt-4 mb-2 col-3" type="submit" onClick={showQuitModal}>
                회원 탈퇴
            </Button>
            <Modal show={quitVisible} onHide={showQuitModal}>
                <Modal.Header>
                    <Modal.Title>사용자 탈퇴 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    탈퇴하시겠습니까?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeQuitModal}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={handleQuitSubmit}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}