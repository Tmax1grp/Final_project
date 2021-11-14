import React, { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import styles from './Board.module.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function ModifyBoard({ classId, articleId, setBoardStatus }) {
  
  const [ modify, setModify ] = useState([]);
  const { selects } = location.state
  const selectlist = ["공지사항", "과제게시판", "질문게시판", "자료게시판"]
  const [ select, Setselect ] = useState(selects);

  useEffect(() => {
    axios.get(`/notice-service/${classId}/notice/${articleId}`)
    .then(res => {
      setModify(res.data);
    })
    .catch(error => {
      console.log(error)
    })
  }, [articleId])

  const handleChangeForm = (e) => {
    setModify({
      ... modify,
      [e.target.name] : e.target.value
    })
  }

  const handleChangeselect = (e) => {
    Setselect(e.target.value)
  }

  const modifycancel = () =>{
    setBoardStatus(0);
  }
  
  const modifysave = () => {
    axios.put(`/notice-service/${classId}/notice/${articleId}`, null,
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

  const goList = () => {
    setBoardStatus(0);
  }

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
      <button onClick={modifycancel}>취소</button>
      <button onClick={modifysave}>저장</button>
      <button onClick={goList}>목록</button>
    </Fragment>
  );
}