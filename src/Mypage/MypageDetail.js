import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

export default function MypageDetail() {
    const [info, setInfo] = useState({
        email: '',
        userId: '',
        userName: '',
        tel: '',
        password: '',
        passwordCheck: '',
        createdAt: ''
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
    }

    // 입력값 검사
    // (1) email이 DB 상에서 중복되는 경우 return false
    // (2) 비밀번호와 비밀번호확인이 일치하지 않는 경우 return false
    const updateCheck = () => {
        let isValid = false;
        // let emailpattern = /^(([^<>()\].,;:\s@"]+(\.[^<>()\].,;:\s@"]+)*)|(".+"))@(([^<>()¥[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        let pwdpattern = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*#?&]).*$/;
        let telpattern = /^[0-9\b -]{0,13}$/;

        // 입력값 검사: password
        // (1) passsword 입력하지 않은 경우
        if (info.password.length > 0 && info.passwordCheck.length > 0) {
            // (2) passsword와 passwordCheck 일치하지 않는 경우
            if (info.password !==info.passwordCheck) {
                alert("입력하신 비밀번호가 일치하지 않습니다.");
                return isValid;
            }
            // (2) passsword가 지정된 패턴과 일치하지 않는 경우
            if (pwdpattern.test(info.password) === false) {
                alert("숫자,문자,특수문자를 조합해서 최소 8자 이상 입력해 주세요.")
                return isValid;
            }
        }
        else {
            alert("비밀번호를 입력해주세요!");
            return isValid;
        }

        // 입력값 검사: tel
        if (telpattern.test(info.tel) === false) {
            alert("숫자만 입력해 주세요.( ex : 01098765432 )")
            return isValid;
        }

        isValid = true;
        return isValid;
    }

    const handleSubmit = event => {
        // 입력값 검사가 false인 경우
        event.preventDefault();
        if (!updateCheck()) {
            event.preventDefault();
            return;
        }

        // 업데이트 수행
        console.log("[사용자 업데이트]: ", info.userId);
        console.log(info);

        axios.put(`/user-service/users`, info)
            .then(res => {
                if (res.status === 200) {
                    alert("변경 완료되었습니다!");
                    document.location.href = '/mypage'
                }
                else{
                    alert("서버와의 통신이 원활하지 않습니다!");
                }
            })
    }


    const handleQuitSubmit = () => {
        console.log("[사용자 탈퇴]: ", info.userId);
        console.log(info);
        axios.delete(`/admin-service/mypage/${userId}`);
        closeQuitModal();
        // redirect to main page
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('userId')
        sessionStorage.removeItem('userName')
        sessionStorage.removeItem('tel')
        document.location.href = '/'
    }

    useEffect(() => {
        if (userId !==null) {
            axios.get(`/admin-service/mypage/${userId}`)
                .then(res => {
                    // console.log(res.data);
                    setInfo({
                        ...res.data,
                        "password": "",
                        "passwordCheck": "",
                    });
                    // console.log(info);
                })
            return;
        }
        else {
            alert("서버와의 통신이 원활하지 않습니다!");
            document.location.href = '/home'
        }
    }, [userId])

    return (
        <>
            <Form>
                <Form.Group as={Row} className="mb-2" controlId="userName">
                    <Form.Label column sm="4">
                        이름
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={info.userName} onChange={handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2" controlId="email">
                    <Form.Label column sm="4">
                        이메일
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="email" readOnly defaultValue={info.email} onChange={handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2" controlId="tel">
                    <Form.Label column sm="4">
                        전화번호
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="tel" defaultValue={info.tel} onChange={handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2" controlId="date">
                    <Form.Label column sm="4">
                        가입일
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="date" readOnly defaultValue={info.createdAt !== null ? info.createdAt.split("T")[0] : ""} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2" controlId="password">
                    <Form.Label column sm="4">
                        비밀번호
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="password" onChange={handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2" controlId="passwordCheck">
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
                탈퇴
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