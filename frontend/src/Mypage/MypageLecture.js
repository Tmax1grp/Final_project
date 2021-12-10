import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

import MypageClassItem from "./MypageClassItem";

import styles from "./Mypage.module.css";

export default function MypageLecture() {
  const [myClasses, setMyClasses] = useState(null);
  const [aCat, setACat] = useState(false);

  useEffect(() => {
    axios
      .get("/classroom-service/lectures/all", {
        params: { userId: sessionStorage.userId },
      })
      .then((res) => {
        setMyClasses(res.data);
        setACat(false);
      })
      .catch((err) => console.log(err));
  }, [aCat]);

  return (
    <>
      <Table bordered hover responsive="md">
        <thead>
          <tr>
            <th className={styles.MemberCell}>번호</th>
            <th className={styles.MemberCell}>강의이름</th>
            <th className={styles.MemberCell}>수강상태</th>
            <th className={styles.MemberCell}>수강취소</th>
          </tr>
        </thead>
        <tbody>
          {myClasses !== null ? (
            myClasses.map((item) => {
              return (
                <MypageClassItem
                  setACat={setACat}
                  key={item.name}
                  item={item}
                />
              );
            })
          ) : (
            <>수강 중인 강의 정보를 불러올 수 없습니다!</>
          )}
        </tbody>
      </Table>
    </>
  );
}
