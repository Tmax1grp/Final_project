import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import HtmlReactParser from 'html-react-parser';

export default function ClassBoardSummaryDiscuss({setActiveKey, setArticleId, setBoardStatus, classId}) {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get(`/discuss-service/${classId}/discuss/all/1`)
    .then(res => {
      setArticles(res.data.content);
    })
    .catch((err) =>
      console.log(err)
    )
  },[])
  
  const articlelist = articles.slice(0, 2).map((article) => {

    const goDetail = () =>{
      setActiveKey("질문게시판");
      setArticleId(article.discussId);
      setBoardStatus(1);
    }
    return (
        <div className="card">
          <button className="card-header" onClick={goDetail}>
            {article.title}
          </button>
          <div className="list-group-item" style={{backgroundColor:"#6495ED"}}>
            {HtmlReactParser(article.content)}
          </div>
        </div>
    )
  })

  return (
    <div>
      {articlelist}    
    </div>
  );
}