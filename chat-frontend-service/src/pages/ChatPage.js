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
    const [classID, setClassID] = useState(null);
    // userID/setClassID: 현재 로그인된 사용자 번호/setter
    // const [userID, setUserID] = useState('sunho');

    useEffect(() => {
        let classId = props.match.params.classId;
        setClassID(classId);

        // TODO: sessionStorage에서 사용자 정보를 가져온다.
    }, []);

    return (
        <>
            {`강의 번호???: ${classID}`}
            <h2>화상 수업 중 채팅 테스트</h2>
            <ChatLecture classID={classID} />
            <h2>채팅 모달 테스트</h2>
            <ChatClassroom classID={classID} />
        </>
    );
}
