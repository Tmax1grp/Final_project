import React, { Fragment, useState } from 'react';

import axios from 'axios';

import styles from './Board.module.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function BoardCreate() {

  const classId = window.location.pathname.split('/')[2];

  const [ board, setBoards ] = useState({
    title: '',
    content: ''
  });

  const [ boardcontent, setBoardContent ] = useState([]);

  const handleChangeForm = (e) => {
    setBoards({
      ...board,
      [e.target.name]: e.target.value
    })
  }
  console.log("1", board.content)
  const create = () => {
    let url = `/notice-service/${classId}/notice`
    let data = {
      'classId' : classId,
      'title' : board.title,
      'content' : board.content,
      'userId' : sessionStorage.userId,
      'userName' : sessionStorage.userName
    }
    var config={
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': sessionStorage.token
      }
    }
    axios.post(url, data, config)
    .then(res => {
      alert("성공")
      window.location.href = `/classroommain/${classId}`
    }).catch(err => {
      alert("실패")
    })
  };
  
  return (
    <Fragment>
      <div className="pl-3 row">
        <div className="d-flex p-0 mr-2 col-2">
          <select className="form-select col-3" aria-label="Default select example">
            <option value="1">공지사항</option>
            <option value="2">과제게시판</option>
            <option value="3">질문게시판</option>
            <option value="4">자료게시판</option>
          </select>
        </div>
        <div className="col-10">
          <input className={styles.titleinput} type='text' name="title" placeholder='제목을 입력해주세요' value={board.title} onChange={handleChangeForm} />
        </div>
      </div>
      <div>
        <CKEditor
          editor={ClassicEditor}
          data="<p><p>"
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            setBoards({
              ...board,
              content: data
            })
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
      </div>
      <button onClick={create}>저장</button>
    </Fragment>
  )
};
