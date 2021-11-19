import React, { useState, useEffect } from 'react';
import axios from 'axios';

import HtmlReactParser from 'html-react-parser';

export default function ClassBoardSummaryNotice({setActiveKey, setArticleId, setBoardStatus, classId}) {

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
  
  const articlelist = articles.slice(0, 2).map((article) => {

    const goDetail = () => {
      setActiveKey("notice");
      setArticleId(article.noticeId);
      setBoardStatus(1);
    }
    
    const text = article.content.substr(0, 45)

    const title = article.title.substr(0, 25)+"..."
    
    return (
      <div className="card">
        <div className="card-header" onClick={goDetail}>
          {
            article.title.length > 25 ?
            <>{title}</>
             : <>{article.title}</>
          }
        </div>
        <div className="list-group-item" style={{minHeight:"100px", maxHeight:"100px"}}>
          {HtmlReactParser(text + " ...")}
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