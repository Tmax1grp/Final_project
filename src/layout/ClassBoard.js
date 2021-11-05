/*
ClassBoard.js
- ClassSidebar에서 선택된 activeBoard를 기반으로 게시판 조건부 렌더링
*/

import React, { useState, useEffect } from 'react';
import ClassBoardHome from '../Board/ClassBoardHome';
import ClassBoardNotice from '../Board/ClassBoardNotice';
import ClassBoardIndex from '../Board/ClassBoardIndex';
import ClassBoardReference from '../Board/ClassBoardReference';
import ClassBoardDiscuss from '../Board/ClassBoardDiscuss';
import ClassBoardAssignment from '../Board/ClassBoardAssignment';

export default function ClassBoard({ classId, activeBoard }) {
  const [board, selectBoard] = useState(null);
  // boards: 게시판(board) 조건부 렌더링을 위한 게시판 이름 배열
  const boards = [ClassBoardHome, ClassBoardNotice, ClassBoardIndex,  ClassBoardDiscuss, ClassBoardAssignment, ClassBoardReference]

  useEffect(() => {
    var boardName = boards[activeBoard];
    // 컴포넌트 생성하여 변수 board를 정의
    // 생성하는 컴포넌트에 props 넘겨주는 경우
    var board = React.createElement(boardName, { classId: classId });
    selectBoard(board);
  }, [activeBoard]);

  return (
    <div>
      {board}
    </div>
  );
}