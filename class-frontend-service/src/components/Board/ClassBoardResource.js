import React from 'react';
import ClassBoardList from '../widgets/ClassBoardList'

// TODO: 한 페이지 게시글 최대 개수 지정 혹은 스크롤링
export default function ClassBoardResource({ classId }) {
    return (
        <div>
            <ClassBoardList name="resource" classId={classId} />
        </div>
    );
}