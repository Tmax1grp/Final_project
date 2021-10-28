/*
ClassroomPage.js
- 강의실 채팅 컴포넌트 테스트를 위한 페이지
*/

import React, { useEffect, useState } from 'react';
import ChatClassroom from '../components/ChatClassroom';

export default function ClassroomPage(props) {

    // classID/setClassID: 현재 페이지의 강의실 번호/setter
    const [classID, setClassID] = useState(null);
    // userID/setClassID: 현재 로그인된 사용자 번호/setter
    // const [userID, setUserID] = useState('sunho');

    useEffect(() => {
        let classId = props.match.params.classId;
        setClassID(classId);

        // TODO: sessionStorage에서 사용자 정보를 가져온다.
    }, [props]);

    return (
        <>
            {`강의 번호: ${classID}`}
            <h2>채팅 모달 테스트</h2>
            <ChatClassroom classID={classID} />
        </>
    );
}