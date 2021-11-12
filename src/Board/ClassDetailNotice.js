import React, { useEffect, useState } from 'react';

import axios from 'axios';

import HtmlReactParser from 'html-react-parser';
// import Navmenu from '../Home/Navmenu';
// import axios from 'axios';
// import { Card } from 'bootstrap';

export default function ClassDetailNotice({classId}) {
  
  const noticeId = window.location.pathname.split('/')[2];

  const [ board, setBoards ] = useState(  {title:" ", content:" "});
  
  useEffect(() => {
    axios.get(`/notice-service/${classId}/notice/${noticeId}`)
    .then(res => {
      // console.log(res.data)
      setBoards(res.data)
    })
  },[])

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
      <button><a href={`/classroommain/${classId}`}>목록</a></button>
    </div>
  );
}