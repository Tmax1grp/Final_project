import React, { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import styles from './Board.module.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function ModifyBoard() {
  
  const location = useLocation()
  const { classId } = location.state
  const { noticeId } = location.state
  
  const [ modify, setModify ] = useState([]);

  useEffect(() => {
    axios.get(`/notice-service/${classId}/notice/${noticeId}`)
    .then(res => {
      setModify(res.data);
    })
    .catch(error => {
      console.log(error)
    })
  }, [noticeId])

  const handleChangeForm = (e) => {
    setModify({
      ... modify,
      [e.target.name] : e.target.value
    })
  }
  console.log(modify)
  const modifysave = () => {
    axios.put(`/notice-service/${classId}/notice/${noticeId}`, null,
    {
      params: {
        title : modify.title,
        content: modify.content
    }})
    .then(res => {
      alert("게시글이 수정되었습니다.")
      window.location.href = `/classroommain/${classId}`
    }).catch(err => {
      alert("게시글 수정 실패")
    })
  }

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
          <input className={styles.titleinput} type='text' name="title" defaultValue={modify.title} value={modify.title} onChange={handleChangeForm}/>
        </div>
      </div>
      <div>      
        <CKEditor
          name="content"
          editor={ClassicEditor}
          data={modify.content}
          onChange={handleChangeForm}
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            setModify({
              ...modify,
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
      <button onClick={modifysave}>저장</button>
      <button>목록</button>
    </Fragment>
  );
}