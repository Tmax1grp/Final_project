import React, { useState, useEffect } from 'react';

import ClassDetailNotice from '../Board/ClassDetailNotice'
import BoardCreate from '../Board/BoardCreate'
import ModifyBoard from '../Board/ModifyBoard'

export default function BoardArticleView({ classId, articleId, boardStatus, setBoardStatus }) {
    const [view, setView] = useState(<></>);

    useEffect(() => {
        switch (boardStatus) {
            case 1: {
                setView(<ClassDetailNotice classId={classId} articleId={articleId} setBoardStatus={setBoardStatus} />); break;
            }
            case 2: {
                setView(<BoardCreate classId={classId} articleId={articleId} setBoardStatus={setBoardStatus} />); break;
            }
            case 3: {
                setView(<ModifyBoard classId={classId} articleId={articleId} setBoardStatus={setBoardStatus} />); break;
            }
            default: {
                setView(<></>)
            };
        }
    }, [boardStatus])

    return (
        <>
            {view}
        </>
    );
}