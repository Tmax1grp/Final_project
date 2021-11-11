import React, { useState } from 'react';
import axios from 'axios';
import { Image, Button, Modal, Form, Row, Col } from 'react-bootstrap';

export default function AdminCreateClassForm() {
    const [createVisible, setCreateVisible] = useState(false);
    const [values, setValues] = useState({
        name: '',
        imgPath: '',
        userId: '',
        content: '',
        participantNum: '',
        status: ''
    });
    const [uploadedFile, setUploadedFile] = useState(null);
    const showCreateModal = () => setCreateVisible(true);
    const closeCreateModal = () => setCreateVisible(false);

    const handleFileChange = e => {
        if (e.target.files != null) {
            setUploadedFile(URL.createObjectURL(e.target.files[0]));
            console.log(e.target.files[0]);
            setValues({
                ...values,
                [e.target.id]: e.target.value
            })
        }
    }

    const handleChange = e => {
        // console.log("id: " + e.target.id + " | " + "value: " + e.target.value);
        // console.log(values);
        setValues({
            ...values,
            [e.target.id]: e.target.value
        });
    }

    const submitCheck = () => {

    }

    const handleSubmit = () => {
        // console.log(values);

        let url = '/admin/classroom/input'
        let data = {
            'userId': sessionStorage.userId,
            // 'name' : values.name
        }
        var config = {
            header: {
                'Content-Type': 'application/json',
            }
        }
        axios.post(url, data, config)
            .then(res => {
                console.log("makepost", res.data)
                alert("성공")
            }).catch(error => {
                alert("실패")
                console.log(error);
            })
        // window.location.reload(false);
    }

    return (
        <>
            <Button className="m-2 float-end col-lg-2 col-md-4" variant="success" onClick={showCreateModal}>강의 생성</Button>
            <Modal show={createVisible} onHide={closeCreateModal}>
                <Modal.Header>
                    <Modal.Title>강의 생성</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image fluid className="mb-3" src={uploadedFile} />
                    <Form.Group as={Row} className="mb-3" controlId="name">
                        <Form.Label column sm="4">
                            강의이름
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="imgPath">
                        <Form.Label column sm="4">
                            강의이미지
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="file" accept=".jpg,.jpeg,.png,.webp" onChange={handleFileChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="userId">
                        <Form.Label column sm="4">
                            강사ID
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="content">
                        <Form.Label column sm="4">
                            강의 설명
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control as="textarea" style={{ height: '100px' }} type="text" onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="participantNum">
                        <Form.Label column sm="4">
                            수강 정원
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="number" min="1" onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    {/* <Form.Group as={Row} className="mb-3" controlId="createdDate">
                        <Form.Label column sm="4">
                            강의생성일
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="date" onChange={handleChange} defaultValue={todayDate} />
                        </Col>
                    </Form.Group> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeCreateModal}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}