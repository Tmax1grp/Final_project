import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

import AdminClassItem from "./AdminClassItem";

import styles from "./Admin.module.css";

export default function AdminLecture() {
  const [classes, setClasses] = useState(null);

  useEffect(() => {
    axios
      .get("/admin-service/admin/classroom/all")
      .then((res) => {
        setClasses(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Table bordered hover responsive="md">
        <thead>
          <tr>
            <th className={styles.MemberCell}>번호</th>
            <th className={styles.MemberCell}>강의이름</th>
            <th className={styles.MemberCell}>강사ID</th>
            <th className={styles.MemberCell}>수강정원</th>
            <th className={styles.MemberCell}>상태</th>
            <th className={styles.MemberCell}>생성일</th>
            <th className={styles.MemberCell}>정보수정</th>
            <th className={styles.MemberCell}>삭제</th>
          </tr>
        </thead>
        <tbody>
          {classes !== null ? (
            classes.map((item) => {
              return <AdminClassItem key={item.classId} item={item} />;
            })
          ) : (
            <>강의 데이터를 불러올 수 없습니다.</>
          )}
        </tbody>
      </Table>
    </>
  );
}
