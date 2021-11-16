import React, { useEffect, useState } from 'react';
import axios from 'axios';

import HtmlReactParser from 'html-react-parser';

export default function ClassDetailNotice({ name, classId, articleId, setBoardStatus }) {

  // const articleId = window.location.pathname.split('/')[2];

  const [ board, setBoards ] = useState({title:" ", content:" ", userName:" "});
  const [ reply, setReply ] = useState([]);
  const [ newreply, setNewreply ] = useState([]);

  useEffect(() => {
    axios.get(`/${name}-service/${classId}/${name}/${articleId}`)
      .then(res => {
        setBoards(res.data)
      })
  },[])

  useEffect(() => {
    axios.get(`/${name}-service/${classId}/${name}/${articleId}/reply`)
      .then(res => {
        setReply(res.data)
      })
  },[])

  const goModify = () =>{
    setBoardStatus(3);
  }

  const golist = () => {
    setBoardStatus(0);
    // window.location.href = `/classroommain/${classId}`
    // window.history.goBack(-1)
  }

  const deleteArticle = () => {
    axios.delete(`/${name}-service/${classId}/${name}/${articleId}`)
      .then(
        alert("삭제되었습니다.")
      )
      window.location.href = `/classroommain/${classId}`
    // return history.goBack()
  }

  const handleChangeForm = (e) => {
    setNewreply({
      ... newreply,
      [e.target.name] : e.target.value
    })
  }

  const sendreply = () => {
    let url = (`/${name}-service/${classId}/${name}/${articleId}/reply`)
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
      let url = (`/${name}-service/${classId}/${name}/${articleId}/reply/${item.replyId}`)
      axios.delete(url)
        .then(res => {
          alert("삭제되었습니다.")
          window.location.reload()
        })
    }
    return (
      <div className="m-1">
        <div className="row m-1">
          <hr/>
          <p className="col-2" style={{color:"black"}}>{item.userName}</p>
          <p className="card-text col-7" style={{color:"black"}}>{item.content}</p>
          <p className="card-text col-2 mt-2 mb-2" style={{color:"black", fontSize:"0.7rem", textAlign:"center", textAlign:"bottom", margin:"0"}}>{item.createDate}</p>
          {
            sessionStorage.userId == item.userId ? (
              <button className="col-1 replybutton" onClick={replydelete}><i class="fas fa-times fa-lg"></i></button>
              // <i class="fas fa-times-circle"></i>
              ) : null
            }
          
        </div>
      </div>
    )
  })

  return (
    <div>
      <div className="card m-3">
        <div className="card-body">
          <h5 class="card-title"><span style={{fontWeight:"bold"}}>[공지사항] </span>{board.title}</h5>
          <h6 class="card-subtitle m-1 text-muted">{board.userName} {board.createDate}</h6>
        </div>
      </div>
      <div className="card m-3">
        <div className="card-body">
          {HtmlReactParser(board.content)}
        </div>
        <hr className="m-3"/>
        <div className="card-body">
          <p className="card-title" style={{color:"black"}}>{sessionStorage.userName}</p>
          <input className="card-subtitle col-11" style={{border:"none"}} type="text" placeholder="댓글을 남겨보세요" name="content" onChange={handleChangeForm}></input>
          <button align="right" className="col-1 replybutton" onClick={sendreply}>등록</button>
        </div>
        {replylist}
      </div>
      <div align="right" className="m-3">
        {
          sessionStorage.userId == board.userId ? (
            <div>
              <button className="clsbutton" onClick={golist}>목록</button>
              <button className="clsbutton" onClick={goModify}>
                  수정
              </button>
              <button className="clsbutton" onClick={deleteArticle}>삭제</button>
            </div>
          ) : <button className="clsbutton" onClick={golist}>목록</button>
        }
      </div>
    </div>
  );
}