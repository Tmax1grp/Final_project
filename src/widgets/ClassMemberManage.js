import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from "react-bootstrap/Table";
import ClassMemberItem from './ClassMemberItem';

import styles from "./ClassMember.module.css";

export default function ClassMemberManage({ classId }) {
  
  const [members, setMembers] = useState(null);

  useEffect(() => {
    axios.get('/lecture-service/students', {
      params: {
        classroomId: classId
      }
    })
    .then(res => {
      setMembers(res.data);
    }).catch((err) =>
      console.log(err)
    )
  }, [])

  return (
    <>
      <h4>수강생 관리</h4>
      <span style={{color:"black"}}>강의실 초대 번호 : {classId} </span>
      <Table bordered hover responsive="sm">
        <thead>
          <tr>
            <th className={styles.MemberCell}>번호</th>
            <th className={styles.MemberCell}>회원이름</th>
            <th className={styles.MemberCell}>수강상태</th>
            <th className={styles.MemberCell}>수강신청승인</th>
            <th className={styles.MemberCell}>수강취소처리</th>
          </tr>
        </thead>
        <tbody>
          {
            members !== null ?
              members.filter(member => member.status == 0 || member.status == 1)
                .map(member => {
                  return (<ClassMemberItem classId={classId} key={member.userId} member={member} />);
                })
              :
              <>사용자 데이터를 불러올 수 없습니다.</>
          }
        </tbody>
      </Table>
    </>
  );
}