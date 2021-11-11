import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';

export default function AdminCreateUserForm() {
    const [createVisible, setCreateVisible] = useState(false);
    const [values, setValues] = useState({
        email: '',
        userName: '',
        password: '',
        tel: ''
    })
    const [emailCheck, setEmailCheck] = useState(0);
    const showCreateModal = () => setCreateVisible(true);
    const closeCreateModal = () => setCreateVisible(false);

    const handleChange = e => {
        // console.log("id: " + e.target.id + " | " + "value: " + e.target.value);
        // console.log(values);
        setValues({
            ...values,
            [e.target.id]: e.target.value
        });
    }

    const checkEmail = (e) => {
        e.preventDefault();
        console.log(values);

        let email = {
            'email': values.email
        }
        let url = '/user-service/duplicatedEmail'
        axios.post(url, email)
            .then(res => res.status)
            .then(status => {
                if (status === 200) {
                    alert("사용가능한 email입니다.");
                    setEmailCheck(200)
                }
                else {
                    alert("이미 사용 중인 email입니다.")
                }
            }).catch(err => {
                console.log(err.name);
            })
    }

    const submitCheck = () => {
        let isValid = false;
        let emailpattern = /^(([^<>()\].,;:\s@"]+(\.[^<>()\].,;:\s@"]+)*)|(".+"))@(([^<>()¥[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        let pwdpattern = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*#?&]).*$/;
        let telpattern = /^[0-9\b -]{0,13}$/;
        if (emailpattern.test(values.email) === false) {
            alert("이메일 형식에 맞게 작성해 주세요.")
            return isValid;
        }
        if (emailCheck !== 200) {
            alert("이미 사용 중인 이메일입니다.")
            return isValid;
        }
        if (pwdpattern.test(values.password) === false) {
            alert("숫자,문자,특수문자를 조합해서 최소 8자 이상 입력해 주세요.")
            return isValid;
        }
        if (telpattern.test(values.tel) === false) {
            alert("숫자만 입력해 주세요.( ex : 01098765432 )")
            return isValid;
        }
        isValid = true;
        return isValid;
    }

    const handleSubmit = e => {
        if (!submitCheck()) {
            e.preventDefault();
            return;
        }
        let newUser = {
            'email': values.email,
            'name': values.userName,
            'password': values.password,
            'tel': values.tel
        }

        // console.log(values);
        axios.post('/admin-service/admin/user/input', newUser)
            .then((res) => {
                alert("생성완료");
                console.log(res);
                document.location.href = '/admin'
            }).catch(error => {
                alert("회원가입실패")
                console.log(error);
            })
        // window.location.reload(false);
    }

    return (
        <>
            <Button className="m-2 float-end col-lg-2 col-md-4" variant="success" onClick={showCreateModal}>사용자 생성</Button>
            <Modal show={createVisible} onHide={closeCreateModal}>
                <Modal.Header>
                    <Modal.Title>사용자 생성</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Row} className="mb-2" controlId="email">
                        <Form.Label column sm="4">
                            email
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="email" placeHolder="email" onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Row>
                        <Col sm={8}></Col>
                        <Col sm={4} className="mb-3 d-grid gap-2">
                            <Button onClick={checkEmail}>중복확인</Button>
                        </Col>
                    </Row>
                    <Form.Group as={Row} className="mb-3" controlId="name">
                        <Form.Label column sm="4">
                            이름
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" placeHolder="username" onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="password">
                        <Form.Label column sm="4">
                            비밀번호
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="password" placeHolder="password" onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="passwordCheck">
                        <Form.Label column sm="4">
                            비밀번호 확인
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="password" placeHolder="password check" onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="tel">
                        <Form.Label column sm="4">
                            전화번호
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="tel" placeHolder="phone" onChange={handleChange} />
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeCreateModal}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        생성
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}