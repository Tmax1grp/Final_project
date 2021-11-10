import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export default function AdminMemberItem({ member }) {
    const [values, setValues] = useState({
        userId: '',
        name: '',
        email: '',
        tel: ''
    });

    const [editVisible, setEditVisible] = useState(false);
    const [quitVisible, setQuitVisible] = useState(false);
    const showEditModal = () => setEditVisible(true);
    const closeEditModal = () => setEditVisible(false);
    const showQuitModal = () => setQuitVisible(true);
    const closeQuitModal = () => setQuitVisible(false);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.id]: event.target.value
        })
        console.log(values);
    }

    const handleEditSubmit = () => {
        closeEditModal();
        console.log("[사용자 업데이트]: ", member.userId);
        console.log(values);
        // axios.post();
        // window.location.reload(false);
    }

    const handleQuitSubmit = () => {
        closeQuitModal();
        console.log("[사용자 삭제]: ", member.userId);
        // axios.delete();
        // window.location.reload(false);
    }

    useEffect(() => {
        setValues(member);
        // console.log(values);
    }, [])

    return (
        <>
            <tr>
                <td>{member.userId}</td>
                <td>{member.createDate}</td>
                <td><Button onClick={showEditModal}>수정</Button></td>
                <td><Button onClick={showQuitModal}>탈퇴</Button></td>
            </tr>
            <Modal show={editVisible} onHide={showEditModal}>
                <Modal.Header>
                    <Modal.Title>회원 정보 수정</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Row} className="mb-3" controlId="userId">
                        <Form.Label column sm="4">
                            회원ID
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" readOnly defaultValue={member.userId} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="name">
                        <Form.Label column sm="4">
                            회원이름
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={member.name} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="email">
                        <Form.Label column sm="4">
                            회원이메일
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="email" defaultValue={member.email} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="tel">
                        <Form.Label column sm="4">
                            회원전화번호
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="tel" defaultValue={member.tel} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="date">
                        <Form.Label column sm="4">
                            회원가입일
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="date" readOnly defaultValue={member.createDate} />
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeEditModal}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={handleEditSubmit}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={quitVisible} onHide={showQuitModal}>
                <Modal.Header>
                    <Modal.Title>사용자 탈퇴 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    '{member.userId}' 회원님의 정보를 삭제하시겠습니까?
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