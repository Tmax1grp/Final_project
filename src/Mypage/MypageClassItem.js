import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

export default function MypageClassItem({ item }) {
    const [quitVisible, setQuitVisible] = useState(false);
    const showDeleteModal = () => setQuitVisible(true);
    const closeDeleteModal = () => setQuitVisible(false);

    const handleDeleteSubmit = e => {
        e.preventDefault();
        closeDeleteModal();
        console.log("[수강 취소]: ");
        axios.put('/lecture-service/students', null, {
            params: {
                classroomId: item.classroomId,
                userId: item.userId,
                status: item.status
            }
        })
            .then(res => {
                console.log(res.status);
            })
            .catch((err) =>
                console.log(err)
            )
        // document.location.href = '/mypage'
    }

    function StatusBtn() {

        switch (item.status) {
            case 0: { return "수강승인대기중" }
            case 1: { return "수강중" }
            case 2: { return "수강취소대기중" }
            case 3: { return "수강취소됨" }
            case 4: { return "종료된강의" }
            case 5: { return "강의중" }
            default: ;
        }
    }

    return (
        <>
            <tr>
                <td>{item.imgPath}</td>
                <td>{item.name}</td>
                <td><StatusBtn /></td>
                <td>
                    {
                        item.status == 1 ?
                            <Button onClick={handleDeleteSubmit}>수강취소신청</Button>
                            :
                            <></>
                    }
                </td>
            </tr>
            <Modal show={quitVisible} onHide={showDeleteModal}>
                <Modal.Header>
                    <Modal.Title>수강 취소 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>'{item.name}' 수업의 수강을 취소하시겠습니까?</Modal.Body>
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