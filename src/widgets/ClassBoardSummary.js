import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import HtmlReactParser from 'html-react-parser';

export default function ClassBoardSummary({classId}) {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get(`/notice-service/${classId}/notice/all`)
    .then(res => {
      setArticles(res.data);
    })
    .catch((err) =>
      console.log(err)
    )
  },[])

  useEffect(() => {
    axios.get(`/discuss-service/discuss/${classId}/discuss/all`)
    .then(res => {
      setArticles(res.data);
    })
    .catch((err) =>
      console.log(err)
    )
  },[])

  console.log(articles)
    
  const articlelist = articles.map((article) => {
    return (
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          {article.title}
        </button>
        </h2>
        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
          <div className="accordion-body" style={{backgroundColor:"#6495ED"}}>
            {HtmlReactParser(article.content)}
          </div>
        </div>
      </div>
    )
  }).slice(-2)

  return (
    <div className="accordion" id="accordionExample">
      {articlelist}    
    </div>
  );
}