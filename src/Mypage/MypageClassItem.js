import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

import styles from "./Mypage.module.css";

export default function MypageClassItem({ setACat, item }) {
  const [quitVisible, setQuitVisible] = useState(false);
  const showDeleteModal = () => setQuitVisible(true);
  const closeDeleteModal = () => setQuitVisible(false);

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    closeDeleteModal();
    console.log("[수강 취소]: ");
    axios
      .put("/lecture-service/students", null, {
        params: {
          classroomId: item.classroomId,
          userId: item.userId,
          status: 2,
        },
      })
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => console.log(err));
    document.location.href = '/mypage'
    setACat(true);
  };

  function StatusTxt() {
    switch (item.status) {
      case 0: {
        return "수강승인대기중";
      }
      case 1: {
        return "수강중";
      }
      case 2: {
        return "수강취소함";
      }
      case 3: {
        return "수강취소됨";
      }
      case 4: {
        return "종료된강의";
      }
      case 5: {
        return "강의중";
      }
      default:
    }
  }

  return (
    <>
      <tr>
        <td className={styles.MemberCell}>{item.classroomId}</td>
        <td>
          <Link
            className={styles.ClassLink}
            to={`/classroommain/${item.classroomId}`}
          >
            {item.name}
          </Link>
        </td>
        <td className={styles.MemberCell}>
          <StatusTxt />
        </td>
        <td className={styles.MemberCell}>
          {item.status == 1 ? (
            <button className="clsbutton" onClick={showDeleteModal}>수강취소신청</button>
          ) : (
            <></>
          )}
        </td>
      </tr>
      <Modal show={quitVisible} onHide={showDeleteModal}>
        <Modal.Header>
          <Modal.Title>수강 취소 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>'{item.name}' 수업의 수강을 취소하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <button className="clsbutton" onClick={closeDeleteModal}>
            닫기
          </button>
          <button className="clsbutton" onClick={handleDeleteSubmit}>
            확인
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
