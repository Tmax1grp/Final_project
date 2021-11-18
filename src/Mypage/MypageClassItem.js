import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { TableBody, TableRow, TableCell } from "@mui/material";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

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
    // document.location.href = '/mypage'
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
        <td>{item.classroomId}</td>
        <td>
          <Link
            to={`/classroommain/${item.classroomId}`}
            style={{ color: "black" }}
          >
            {item.name}
          </Link>
        </td>
        <td align="center">
          <StatusTxt />
        </td>
        <td align="center">
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
