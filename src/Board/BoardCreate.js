import React, { Fragment, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import styles from './Board.module.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function BoardCreate({ setBoardStatus, classId }) {

  // const classId = window.location.pathname.split('/')[2];

  const [ board, setBoards ] = useState({
    title: '',
    content: ''
  });
  const location = useLocation()
  const { selects } = location.state
  const selectlist = ["공지사항", "과제게시판", "질문게시판", "자료게시판"]
  const [ select, Setselect ] = useState(selects);

  const handleChangeForm = (e) => {
    setBoards({
      ...board,
      [e.target.name]: e.target.value
    })
  }
  
  const handleChangeselect = (e) => {
    Setselect(e.target.value)
  }

  const create = () => {
    let url = "";
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
    if (select == selectlist[0]) {
      url = `/notice-service/${classId}/notice`
    } else if (select == selectlist[1]) {
      url = `/assignment-service/${classId}/assignment`
    } else if (select == selectlist[2]) {
      url = `/discuss-service/${classId}/discuss`
    } else {
      url = `/reference-service/${classId}/reference`
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
          <select className="form-select col-3" aria-label="Default select example" onChange={handleChangeselect} value={select}>
            {
              selectlist.map((item) => (
                <option value={item} key={item}>{item}</option>
              ))
            }
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
      <button onClick={() => { setBoardStatus(0) }}>취소</button>
      <button onClick={create}>저장</button>
    </Fragment>
  )
};
