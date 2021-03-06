import React, { useState, useEffect } from 'react';

import ClassDetailNotice from './ClassDetailNotice'
import BoardCreate from '../Board/BoardCreate'
import ModifyBoard from '../Board/ModifyBoard'

export default function BoardArticleView({ activeKey, classId, articleId, boardStatus, setBoardStatus, status }) {
  const [view, setView] = useState(<></>);
  const [aCat, setACat] = useState(true);

  useEffect(() => {
    switch (boardStatus) {
      case 1: {
        setView(<ClassDetailNotice aCat={aCat} setACat={setACat} name={activeKey} classId={classId} articleId={articleId} setBoardStatus={setBoardStatus} status={status}/>); break;
      }
      case 2: {
        setView(<BoardCreate activeKey={activeKey} name={activeKey} classId={classId} articleId={articleId} setBoardStatus={setBoardStatus} />); break;
      }
      case 3: {
        setView(<ModifyBoard activeKey={activeKey} name={activeKey} classId={classId} articleId={articleId} setBoardStatus={setBoardStatus} />); break;
      }
      default: {
        setView(<></>)
      };
    }
  }, [boardStatus, aCat])

  return (
    <>
      {view}
    </>
);
}