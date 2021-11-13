// import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
import styles from './Class.module.css';

// TODO: chatContainer 컴포넌트 추가
export default function ClassHeader( {classId, clsname, teacher} ) {
  // console.log(clsname)
  // lecture: 강의 데이터 (강사 이름, 강의 제목)
  // const [lecture, setLecture] = useState({ lecturer: "홍길동", lectureName: "Spring으로 배우는 MSA, DEV OPS" });
  const [onLive, setOnLive] = useState(false);
  
  // useEffect(() => {
  //   axios.get('/classroom-service/lectures/all')
  //   // TODO: window.location.href: 강의 id
  //   // TODO: [be] 서버에 강의 정보 데이터 요청: setLecture()
  //   // setLecture({lecturer: "", lectureName: ""})
  //   setLecture({ lecturer: "홍길동", lectureName: "Spring으로 배우는 MSA, DEV OPS" })

  //   // TODO: [be] 화상수업 진행중 여부 데이터 요청: setOnLive()
  //   // let isLive = true;
  //   // setOnLive(isLive);
  // }, [])

  return (
    <div className="row">
      <div className="col-8">
        <nav className={styles.sun}>
          <li><a>[강의명] : {clsname}</a></li>
          <li>[강사] : {teacher}</li>
        </nav>
      </div>
      <div className="col-4">
        {
          onLive === true ?
          <li><a href="http://localhost:3001" style={{color:"black"}}>실시간 강의 바로가기</a></li> :
          <li><a href="http://localhost:3001" style={{color:"black"}}>실시간 강의test버전</a></li>
        }
        {/* <li><a href="/lecture">강의</a></li> */}
        <li><a href="https://3.17.41.125:3000" style={{color:"black"}}>실시간 강의EC2</a></li>
        <li style={{color:"black"}}>강의실 초대 번호 : {classId} </li>
        {/* <Button>실시간 채팅</Button>   */}
      </div>
    </div>
  );
}