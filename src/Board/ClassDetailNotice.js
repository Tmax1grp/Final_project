import axios from 'axios';
import React, {useEffect, useState} from 'react';
// import Navmenu from '../Home/Navmenu';
// import axios from 'axios';

export default function ClassDetailNotice() {

  // useEffect(() => {
  //   axios.get(`/notice-service/{classId}/notice/{noticeId}`)
  //   .then(res => {
  //     console.log(res.data)
  //   })
  // },[])

  return (
    <div>
      <div>제목</div>
      <div>내용</div>
      <div>댓글</div>
    </div>
  );
}