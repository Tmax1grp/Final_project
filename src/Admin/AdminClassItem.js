import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';

export default function AdminClassItem({ item }) {
    const [values, setValues] = useState({
        classId: '',
        name: '',
        imgPath: '',
        userId: '',
        content: '',
        participantNum: '',
        status: '',
        createdDate: ''
    });

    const [editVisible, setEditVisible] = useState(false);
    const [quitVisible, setQuitVisible] = useState(false);

    const showEditModal = () => setEditVisible(true);
    const closeEditModal = () => setEditVisible(false);
    const showDeleteModal = () => setQuitVisible(true);
    const closeDeleteModal = () => setQuitVisible(false);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.id]: event.target.value
        })
        console.log(values);
    }

    const handleEditSubmit = () => {
        closeEditModal();
        console.log("[강의 업데이트]: ", item.name);
        console.log(values);
        // axios.post();
        // window.location.reload(false);
    }

    const handleDeleteSubmit = () => {
        closeDeleteModal();
        console.log("[강의 삭제]: ", item.userId);
        axios.delete(`/admin/classroom/${item}`);
        // window.location.reload(false);
    }

    useEffect(() => {
        setValues(item);
        // console.log(values);
    }, [])

    return (
        <>
            <tr>
                <td>{item.imgPath}</td>
                <td>{item.name}</td>
                <td>{item.createdDate != null ? item.createdDate.split("T")[0] : ""}</td>
                <td><Button onClick={showEditModal}>수정</Button></td>
                <td><Button onClick={showDeleteModal}>삭제</Button></td>
            </tr>
            <Modal show={editVisible} onHide={showEditModal}>
                <Modal.Header>
                    <Modal.Title>강의 정보 수정</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Row} className="mb-3" controlId="userId">
                        <Form.Label column sm="4">
                            강의이름
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" readOnly defaultValue={item.name} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="name">
                        <Form.Label column sm="4">
                            강의이미지
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={item.imgPath} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="email">
                        <Form.Label column sm="4">
                            강사ID
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="email" defaultValue={item.userId} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="tel">
                        <Form.Label column sm="4">
                            강의상태
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="tel" defaultValue={item.status} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="tel">
                        <Form.Label column sm="4">
                            강의생성일
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="date" readOnly defaultValue={item.createdDate != null ? item.createdDate.split("T")[0] : ""} onChange={handleChange} />
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
            <Modal show={quitVisible} onHide={showDeleteModal}>
                <Modal.Header>
                    <Modal.Title>강의 삭제 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>다음 강의의 삭제 처리를 진행하시겠습니까?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDeleteModal}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={handleDeleteSubmit}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}