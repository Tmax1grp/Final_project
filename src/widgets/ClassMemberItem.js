import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

import styles from "./ClassMember.module.css";

export default function ClassMemberItem({ setACat, classId, member }) {
  const [statusTxt, setStatusTxt] = useState();

  const [quitVisible, setQuitVisible] = useState(false);
  const [accVisible, setAccVisible] = useState(false);
  const showAccModal = () => setAccVisible(true);
  const closeAccModal = () => setAccVisible(false);
  const showQuitModal = () => setQuitVisible(true);
  const closeQuitModal = () => setQuitVisible(false);

  const handleCancelSubmit = () => {
    console.log("[사용자 수강취소]: ", member.userId);
    console.log(member);
    axios.put("/lecture-service/students", null, {
      params: {
        classroomId: classId,
        userId: member.userId,
        status: 2,
      },
    }).then(() => {
      closeQuitModal();
      setACat(true);
      // document.location.href = `/classroommain/${classId}`;
    })
  };

  const handleAccSubmit = () => {
    console.log("[사용자 수강신청승인]: ", member.userId);
    console.log(member);
    axios.put("/lecture-service/students", null, {
      params: {
        classroomId: classId,
        userId: member.userId,
        status: 1,
      },
    })
      .then(() => {
        closeQuitModal();
        setACat(true);
        // document.location.href = `/classroommain/${classId}`;
      })
      ;
  };
  useEffect(() => {
    switch (member.status) {
      case 0: {
        setStatusTxt("수강신청");
        break;
      }
      case 1: {
        setStatusTxt("수강중");
        break;
      }
      default:
    }
  }, [member]);

  return (
    <>
      <tr>
        <td className={styles.MemberCell}>{member.userId}</td>
        <td className={styles.MemberCell}>{member.userName}</td>
        <td className={styles.MemberCell}>{statusTxt}</td>
        {member.status == 0 ? (
          <td className={styles.MemberCell}>
            <button className="clsbutton" onClick={showAccModal}>
              승인
            </button>
          </td>
        ) : (
          <td></td>
        )}
        <td className={styles.MemberCell}>
          <button className="clsbutton" onClick={showQuitModal}>
            변경
          </button>
        </td>
      </tr>
      {member.status == 0 ? (
        <Modal show={accVisible} onHide={closeAccModal}>
          <Modal.Header>
            <Modal.Title>수강 승인 처리</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            '{member.userName}' 회원님을 수강 승인 처리하시겠습니까?
          </Modal.Body>
          <Modal.Footer>
            <button className="clsbutton" onClick={closeAccModal}>
              취소
            </button>
            <button className="clsbutton" onClick={handleAccSubmit}>
              확인
            </button>
          </Modal.Footer>
        </Modal>
      ) : (
        <></>
      )}
      <Modal show={quitVisible} onHide={closeQuitModal}>
        <Modal.Header>
          <Modal.Title>수강 취소 처리</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          '{member.userName}' 회원님을 수강 취소 처리하시겠습니까?
        </Modal.Body>
        <Modal.Footer>
          <button className="clsbutton" onClick={closeQuitModal}>
            취소
          </button>
          <button className="clsbutton" onClick={handleCancelSubmit}>
            확인
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
