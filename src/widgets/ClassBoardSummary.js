import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import HtmlReactParser from 'html-react-parser';

export default function ClassBoardSummary({classId}) {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get(`/notice-service/${classId}/notice/all/1`)
    .then(res => {
      setArticles(res.data.content);
    })
    .catch((err) =>
      console.log(err)
    )
  },[])

  useEffect(() => {
    axios.get(`/discuss-service/${classId}/discuss/all/1`)
    .then(res => {
      setArticles(res.data.content);
    })
    .catch((err) =>
      console.log(err)
    )
  },[])
  
  const articlelist = articles.map((article) => {
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

  return (
    <div>
      {articlelist}    
    </div>
  );
}