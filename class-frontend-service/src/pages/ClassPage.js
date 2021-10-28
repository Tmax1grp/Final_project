/*
ClassPage.js
- 강의실 페이지
*/

import React, { useState, useEffect } from 'react';
import ClassViews from '../components/ClassViews'

export default function ClassPage() {
    const [classId, setClassId] = useState(-1);

    useEffect(() => {
        // TODO: 현재 url 혹은 sessionStorage에서 classroom_id를 불러온다.
        // (1)
        // let url = window.location.href
        // let urlArr = url.split('/')
        // let classID = parseInt(urlArr[urlArr.length-1])
        // setClassID(classID) 
        // 혹은 다른 구현 방법이 있으면 사용
        setClassId(120);
    }, [])
    return (
        <>
            <ClassViews classId={classId} />
            
        </>
    );
}