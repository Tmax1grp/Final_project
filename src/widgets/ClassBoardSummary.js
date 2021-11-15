import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import HtmlReactParser from 'html-react-parser';

export default function ClassBoardSummary({classId}) {

  const [notiarticles, setNotiArticles] = useState([]);
  const [discarticles, setDiscArticles] = useState([]);

  useEffect(() => {
    axios.get(`/notice-service/${classId}/notice/all/1`)
    .then(res => {
      setNotiArticles(res.data.content);
    })
    .catch((err) =>
      console.log(err)
    )
  },[])

  useEffect(() => {
    axios.get(`/discuss-service/${classId}/discuss/all/1`)
    .then(res => {
      setDiscArticles(res.data.content);
    })
    .catch((err) =>
      console.log(err)
    )
  },[])
  
  const notiarticlelist = notiarticles.map((article) => {
    console.log(article)
    return (
      <Link to={{
        pathname: `/classdetailnotice/${article.noticeId}`,
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
          <label>공지사항</label> 
          {notiarticlelist}
        </Col>
        <Col>
          <label>질문</label> 
          {discarticlelist}
        </Col>
      </Row>
    </div>
  )
}
