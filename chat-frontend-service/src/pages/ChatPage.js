/*
ChatPage.js
- 채팅 템플릿 테스트를 위한 페이지
- (1) 강의실>채팅, (2) 화상수업>채팅 두가지 경우를 위한 뷰를 테스트
*/

import React, { useEffect, useState } from 'react';
import ChatLecture from '../components/ChatLecture';
import ChatClassroom from '../components/ChatClassroom';

export default function ChatPage(props) {
    // classID/setClassID: 현재 페이지의 강의실 번호/setter
    const [classID, setClassID] = useState(1);
    // userID/setClassID: 현재 로그인된 사용자 번호/setter
    // const [userID, setUserID] = useState('sunho');

    useEffect(() => {
        // 현재 url 혹은 sessionStorage에서 classroomID 정보를 불러온다.
        // // TODO: check 
        // let url = window.location.href
        // let urlArr = url.split('/')
        // let classID = parseInt(urlArr[urlArr.length-1])
        // setClassID(classID) 
        setClassID(1);
    }, []);

    return (
        <>
            <h2>화상 수업 중 채팅 테스트</h2>
            <ChatLecture classID={classID} />
            <h2>채팅 모달 테스트</h2>
            <ChatClassroom classID={classID} />
        </>
    );
}