import React, { useState, useEffect } from 'react';
import axios from 'axios';

import HtmlReactParser from 'html-react-parser';

export default function ClassBoardSummaryDiscuss({setActiveKey, setArticleId, setBoardStatus, classId}) {

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

  const discarticlelist = discarticles.slice(0 , 2).map((article) => {

    const goDetail = () => {
      setActiveKey("discuss");
      setArticleId(article.discussId);
      setBoardStatus(1);
    }

    return (
      <div className="card">
        <div className="card-header" onClick={goDetail}>
          {article.title}
        </div>
        <div className="list-group-item" style={{minHeight:"100px", maxHeight:"100px"}}>
          {HtmlReactParser(article.content)}
        </div>
      </div>
    )
  })

  return (
    <div>
      {discarticlelist}
    </div>
  )
}
