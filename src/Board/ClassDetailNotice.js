import React, { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

import HtmlReactParser from 'html-react-parser';

export default function ClassDetailNotice() {
  
  const location = useLocation()
  const history = useHistory()
  const { classId } = location.state

  const noticeId = window.location.pathname.split('/')[2];
  
  const [ board, setBoards ] = useState({title:" ", content:" "});
  const [ reply, setReply ] = useState([]);

  useEffect(() => {
    axios.get(`/notice-service/${classId}/notice/${noticeId}`)
    .then(res => {
      setBoards(res.data)
    })
  },[])

  useEffect(() => {
    axios.get(`/notice-service/${classId}/notice/${noticeId}/reply`)
    .then(res => {
      console.log(res.data)
    })
  },[])
  const golist = () => {
    window.location.href = `/classroommain/${classId}`
  }

  const noticedelete = () => {
    axios.delete(`/notice-service/${classId}/notice/${noticeId}`)
    .then(
      alert("삭제되었습니다.")
    )
    return history.goBack()
  }

  // const gomodify = () => {
  //   window.location.href = `/boardcreate`
  // }

  // const boardmodify = () => {
  //   let url = `/notice-service/${classId}/notice/${noticeId}`
  //   let data = {   
  //     'title' : board.title,
  //     'content' : board.content,
  //   }
  //   var config={
  //     headers: {
  //       'Content-Type' : 'application/json',
  //       'Authorization': sessionStorage.token
  //     }
  //   }
  //   axios.put(url, data, config)
  //   .then(res => {
  //     alert("성공")
  //   }).catch(error => {
  //     alert("실패")
  //   })
    
  // }

  return (
    <div>
      <div className="card bg-light m-3" style={{maxWidth: "80%"}}>
        <div className="card-header">{board.title}</div>
      </div>
      {/* <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div className="accordion-body" style={{backgroundColor:"#6495ED"}}>
        {HtmlReactParser(board.content)}
        </div>
      </div> */}
      <div className="card bg-light m-3" style={{maxWidth: "80%"}}>
        <div className="card-body" style={{backgroundColor:"#6495ED"}}>
          {HtmlReactParser(board.content)}
        </div>
      </div>

      <div className="card bg-light m-3" style={{maxWidth: "80%"}}>
        <div className="card-body">
          <p className="card-text" style={{color:"black"}}>댓글</p>
        </div>
      </div>
      <button onClick={golist}>목록</button>
      <button><Link to={{
        pathname : `/modifyboard/${classId}/${noticeId}`,
        state : {
          classId : classId,
          noticeId : noticeId
        }
      }}>수정
      </Link></button>
      <button onClick={noticedelete}>삭제</button>
    </div>
  );
}