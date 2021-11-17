import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom'

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
    const [statusTxt, setStatusTxt] = useState();

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
    }
    
    const handleEditSubmit = () => {
        console.log("[강의 업데이트]: ", item.name);
        console.log(values);
        axios.put(`/admin-service/admin/classroom/${item.classId}`, null, {
            params: {
                name: values.name,
                content: values.content,
                participantNum: values.participantNum,
                status: values.status
            }
        })
            .then(res => {
                console.log(res.status);
            });
        closeEditModal();
        document.location.href = '/admin'
    }

    const handleDeleteSubmit = () => {
        console.log("[강의 삭제]: ", item.userId);
        axios.delete(`/admin-service/admin/classroom/${item.classId}`);
        closeDeleteModal();
        document.location.href = '/admin'
    }

    useEffect(() => {
        setValues(item);
        if (item.status === 4)
            setStatusTxt("종료됨");
        else
            setStatusTxt("진행중");
    }, [item])

    return (
        <>
            <tr>
                <td>{item.classId}</td>
                <td>
                    <Link className="clsbutton" to={`/classroommain/${item.classId}`} style={{ textDecoration: 'none' } }>
                        {item.name}
                    </Link>
                </td>
                <td>{item.userId}</td>
                <td>{item.participantNum}</td>
                <td>{statusTxt}</td>
                <td>{item.createdDate !== null ? item.createdDate.split("T")[0] : ""}</td>
                <td><button className="clsbutton" onClick={showEditModal}>수정</button></td>
                <td><button className="clsbutton" onClick={showDeleteModal}>삭제</button></td>
            </tr>
            <Modal show={editVisible} onHide={closeEditModal}>
                <Modal.Header>
                    <Modal.Title>강의 정보 수정</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Row} className="mb-3" controlId="name">
                        <Form.Label column sm="4">
                            강의이름
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={item.name} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="userId">
                        <Form.Label column sm="4">
                            강사ID
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" readOnly defaultValue={item.userId} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="content">
                        <Form.Label column sm="4">
                            강의설명
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control as="textarea" type="text" defaultValue={item.content} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="participantNum">
                        <Form.Label column sm="4">
                            수강정원
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="number" defaultValue={item.participantNum} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="status">
                        <Form.Label column sm="4">
                            강의상태
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="number" defaultValue={item.status} min="0" max="5" onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">
                            강의생성일
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="date" readOnly defaultValue={item.createdDate !== null ? item.createdDate.split("T")[0] : ""} onChange={handleChange} />
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
            <Modal show={quitVisible} onHide={closeDeleteModal}>
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