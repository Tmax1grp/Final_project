import React, { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

import HtmlReactParser from 'html-react-parser';

export default function ClassDetailNotice() {
  
  const location = useLocation()
  const history = useHistory()
  const { classId } = location.state

  const noticeId = window.location.pathname.split('/')[2];
  
  const [ board, setBoards ] = useState({title:" ", content:" ", userName:" "});
  const [ reply, setReply ] = useState([]);
  const [ newreply, setNewreply ] = useState([]);

  useEffect(() => {
    axios.get(`/notice-service/${classId}/notice/${noticeId}`)
    .then(res => {
      setBoards(res.data)
    })
  },[])

  useEffect(() => {
    axios.get(`/notice-service/${classId}/notice/${noticeId}/reply`)
    .then(res => {
      setReply(res.data)
    })
  },[])

  const golist = () => {
    window.location.href = `/classroommain/${classId}`
    // window.history.goBack(-1)
  }

  const noticedelete = () => {
    axios.delete(`/notice-service/${classId}/notice/${noticeId}`)
    .then(
      alert("삭제되었습니다.")
    )
    return history.goBack()
  }

  const handleChangeForm = (e) => {
    setNewreply({
      ... newreply,
      [e.target.name] : e.target.value
    })
  }

  const sendreply = () => {
    let url = (`/notice-service/${classId}/notice/${noticeId}/reply`)
    let data = {
      'userId': sessionStorage.userId,
      'content' : newreply.content,
      'userName' : sessionStorage.userName
    }
    var config={
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': sessionStorage.token
      }
    }
    axios.put(url, data, config)
    .then(res => {
      window.location.reload()
    })
  }

  const replylist = reply.map((item) => {
    const replydelete = () => {
      let url = (`/notice-service/${classId}/notice/${noticeId}/reply/${item.replyId}`)
      axios.delete(url)
      .then(res => {
        alert("삭제되었습니다.")
        window.location.reload()
      })
    }
    return (
      <div className="card bg-light m-3" style={{maxWidth:"80%"}}>
        <div className="row card-body">
          <p className="col-2" style={{color:"black"}}>{item.author}</p>
          <p className="card-text col-7" style={{color:"black"}}>{item.content}</p>
          <p className="card-text col-2" style={{color:"black", fontSize:"0.7rem"}}>{item.createDate}</p>
          {
            sessionStorage.userId == item.title ? (
              <button className="col-1" onClick={replydelete}><i class="fas fa-times-circle"></i></button>
              // <i class="fas fa-times-circle"></i>
            ) : null
          }
        </div>
      </div>
    )
  })

  console.log(board)
  return (
    <div>
      <div className="card bg-light m-3" style={{maxWidth: "80%"}}>
        <div className="card-header">{board.title}</div>
      </div>
      <div className="card bg-light m-3" style={{maxWidth: "80%"}}>
        <div className="card-body" style={{backgroundColor:"#6495ED"}}>
          {HtmlReactParser(board.content)}
        </div>
      </div>
      {replylist}
      <div className="card bg-light m-3" style={{maxWidth: "80%"}}>
        <div className="row">
          <p className="col-2" style={{color:"black"}}>{sessionStorage.userName}</p>
          <input className="col-9" type="text" placeholder="댓글을 입력해주세요" name="content" onChange={handleChangeForm}></input>
          <button className="col-1" onClick={sendreply}>입력</button>
        </div>
      </div>
      {
        sessionStorage.userId == board.userId ? (
          <div>
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
        ) : <button onClick={golist}>목록</button>
      }
    </div>
  );
}