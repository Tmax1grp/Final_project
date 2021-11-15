import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import HtmlReactParser from 'html-react-parser';

export default function ClassBoardSummaryDiscuss({setActiveKey, setArticleId, setBoardStatus, classId}) {

  const [notiarticles, setNotiArticles] = useState([]);
  const [discarticles, setDiscArticles] = useState([]);

  useEffect(() => {
    axios.get(`/discuss-service/${classId}/discuss/all/1`)
    .then(res => {
      setDiscArticles(res.data.content);
    })
    .catch((err) =>
      console.log(err)
    )
  },[])
  
  // const articlelist = articles.slice(0, 2).map((article) => {

  //   const goDetail = () =>{
  //     setActiveKey("질문게시판");
  //     setArticleId(article.discussId);
  //     setBoardStatus(1);
  //   }
  //   return (
  //       <div className="card">
  //         <button className="card-header" onClick={goDetail}>
  //           {article.title}
  //         </button>
  //         <div className="list-group-item" style={{backgroundColor:"#6495ED"}}>
  //           {HtmlReactParser(article.content)}
  //         </div>
  //       </div>
  //   )
  // })

  const discarticlelist = discarticles.map((article) => {
    return (
      <Link to={{
        pathname: `/classdetaildiscuss/${article.discussId}`,
        state: {
          classId: classId
        }
      }}
      >
        <div className="card">
          <div className="card-header">
            {article.title}
          </div>
          <div className="list-group-item" style={{backgroundColor:"#6495ED"}}>
            {HtmlReactParser(article.content)}
          </div>
        </div>
      </Link>
    )
  }).slice(0, 2)

  return (
    <div>
      <Row>
        <Col>
          {discarticlelist}
        </Col>
      </Row>
    </div>
  )
}
