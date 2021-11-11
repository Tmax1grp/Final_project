import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function MypageClassItem({ item }) {
    const [quitVisible, setQuitVisible] = useState(false);
    const showDeleteModal = () => setQuitVisible(true);
    const closeDeleteModal = () => setQuitVisible(false);

    const handleDeleteSubmit = () => {
        closeDeleteModal();
        console.log("[강의 삭제]: ", item.userId);
        // axios.delete();
        // window.location.reload(false);
    }

    return (
        <>
            <tr>
                <td>{item.imgPath}</td>
                <td>{item.name}</td>
                <td>{item.status}</td>
                <td><Button onClick={showDeleteModal}>취소신청</Button></td>
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