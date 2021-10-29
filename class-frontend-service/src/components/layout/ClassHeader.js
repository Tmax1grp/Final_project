import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'

// TODO: chatContainer 컴포넌트 추가
export default function ClassHeader() {

    // lecture: 강의 데이터 (강사 이름, 강의 제목)
    const [lecture, setLecture] = useState({ lecturer: "홍길동", lectureName: "Spring으로 배우는 MSA, DEV OPS" });
    const [onLive, setOnLive] = useState(false);

    useEffect(() => {
        // TODO: window.location.href: 강의 id
        // TODO: [be] 서버에 강의 정보 데이터 요청: setLecture()
        // setLecture({lecturer: "", lectureName: ""})
        setLecture({ lecturer: "홍길동", lectureName: "Spring으로 배우는 MSA, DEV OPS" })

        // TODO: [be] 화상수업 진행중 여부 데이터 요청: setOnLive()
        // let isLive = true;
        // setOnLive(isLive);
    }, [])

    return (
        <div className="headerContainer">
            <div id="lectureInfo">
                lecturer: {lecture.lecturer}
                lecture name: {lecture.lectureName}
            </div>
            {
                onLive === true ?
                    <Button>실시간 강의 바로가기</Button> :
                    <Button>실시간 강의 준비중</Button>
            }
            <Button>실시간 채팅</Button>
        </div>
    );
}