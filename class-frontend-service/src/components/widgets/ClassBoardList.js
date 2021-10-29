import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';

export default function ClassBoardList({ name, classId }) {
    const [articles, setArticles] = useState(null);

    useEffect(() => {
        // TODO: classId 바탕으로 'name' 게시글 데이터 GET, setArticles()

        axios.get(`http://localhost:55000/${name}?class_id=${classId}`)
            .then(res => {
                setArticles(res.data);
            });

    }, [classId])

    return (
        <div>
            <ListGroup>
                {
                    articles !== null ?
                        articles.map((article) => (
                            <ListGroupItem>
                                {/* <div>글번호: {article.id}</div> */}
                                <div>제목: {article.title}</div>
                                <div>작성자: {article.author_id}</div>
                                <div>작성일: {article.created_at}</div>
                            </ListGroupItem>
                        )) :
                        <ListGroupItem>
                            '등록된 글이 없습니다.'
                        </ListGroupItem>
                }
            </ListGroup>
        </div>
    );
}