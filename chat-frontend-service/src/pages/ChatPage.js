/*
ChatPage.js
- 채팅 템플릿 테스트를 위한 페이지
- (1) 강의실>채팅, (2) 화상수업>채팅 두가지 경우를 위한 뷰를 테스트
*/

import React, { useEffect, useState } from 'react';
import ChatLecture from '../components/ChatLecture';
import ChatClassroom from '../components/ChatClassroom';

export default function ChatPage(props) {
    const [classID, setClassID] = useState(1);
    const [userID, setUserID] = useState('sunho');

    // 현재 url 혹은 sessionStorage에서 classroomID 정보를 불러온다.
    useEffect(() => {
        setClassID(1);
    }, []);

    return (
        <>
            화상 수업 중 채팅 테스트
            <ChatLecture classID={classID} />
            채팅 모달 테스트
            <ChatClassroom classID={classID} />
        </>
    );
}