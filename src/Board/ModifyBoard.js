import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import styles from './Board.module.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function ModifyBoard({ activeKey, classId, articleId, setBoardStatus }) {
  
  const [ modify, setModify ] = useState([]);
  const selectlist = ["공지사항", "과제게시판", "질문게시판", "자료게시판"]
  const [ select, Setselect ] = useState(activeKey);

  useEffect(() => {
    switch (activeKey){
      case "${activeKey}": { Setselect("공지사항"); break; }
      case "assignment": { Setselect("과제게시판"); break; }
      case "discuss": { Setselect("질문게시판"); break; }
      case "reference": { Setselect("자료게시판"); break; }
      default: break;
    }
  }, [activeKey])

  useEffect(() => {
    axios.get(`/${activeKey}-service/${classId}/${activeKey}/${articleId}`)
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
    setBoardStatus(1);
  }
  
  const modifysave = () => {
    axios.put(`/${activeKey}-service/${classId}/${activeKey}/${articleId}`, null,
    {
      params: {
        title : modify.title,
        content: modify.content
    }})
    .then(res => {
      alert("게시글이 수정되었습니다.")
      setBoardStatus(0);
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
        <div className="d-flex p-3 mr-2 col-2">
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
      <div align="right" className="m-2">
        <button className="clsbutton" onClick={modifycancel}>취소</button>
        <button className="clsbutton" onClick={modifysave}>저장</button>
        <button className="clsbutton" onClick={goList}>목록</button>
      </div>
    </Fragment>
  );
}