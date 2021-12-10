import React, { useEffect, useState } from 'react';
import axios from 'axios';

import HtmlReactParser from 'html-react-parser';

export default function ClassDetailNotice({ aCat, setACat, name, classId, articleId, setBoardStatus, status }) {

  const [ board, setBoards ] = useState({title:" ", content:" ", userName:" "});
  const [ reply, setReply ] = useState([]);
  const [ newreply, setNewreply ] = useState([]);

  useEffect(() => {
    axios.get(`/${name}-service/${classId}/${name}/${articleId}`)
      .then(res => {
        setBoards(res.data)
        setACat(true);
      })
  },[aCat])

  useEffect(() => {
    axios.get(`/${name}-service/${classId}/${name}/${articleId}/reply`)
      .then(res => {
        setReply(res.data)
        setACat(true);
      })
  },[aCat])

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
    setBoardStatus(0);
    // window.location.href = `/classroommain/${classId}`
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
        setACat(false);
        // setBoardStatus(0);  
        setNewreply({
          ...newreply,
          "content": ""
        })
      })
  }

  const replylist = reply.map((item) => {
    const replydelete = () => {
      let url = (`/${name}-service/${classId}/${name}/${articleId}/reply/${item.replyId}`)
      axios.delete(url)
        .then(res => {
          alert("삭제되었습니다.")
          setACat(false);
          // setBoardStatus(0);
        })
    }
    return (
      <div className="m-1">
        <div className="row m-1">
          <hr/>
          <p className="col-2" style={{color:"black"}}>{item.userName}</p>
          <p className="card-text col-7" style={{color:"black"}}>{item.content}</p>
          <p className="card-text col-2 " style={{color:"black", fontSize:"1rem", textAlign:"center", textAlign:"bottom", margin:"0"}}>{item.createDate.split("T")[0]}</p>
          {
            sessionStorage.userId == item.userId | status == 5 | sessionStorage.userName == "admin" ? (
              <button className="col-1 replybutton mb-3" onClick={replydelete}><i class="fas fa-times fa-lg"></i></button>
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
          <h5 class="card-title">{board.title}</h5>
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
          <input className="card-subtitle col-11" type="text" value={newreply.content} placeholder="댓글을 남겨보세요" name="content" onChange={handleChangeForm} style={{borderBlockColor:"#3d4a64", borderRadius:"0.3rem 0 0 0.3rem"}} />
          <button align="right" className="col-1 clsbutton" onClick={sendreply} style={{margin:"0", borderRadius:"0 0.3rem 0.3rem 0", height:"33px"}} >등록</button>
        </div>
        {replylist}
      </div>
      <div align="right" className="m-3">
        {
          sessionStorage.userId == board.userId | status == 5 | sessionStorage.userName == "admin" ? (
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