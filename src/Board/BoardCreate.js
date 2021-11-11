// import React, { Fragment, useState } from 'react';
// import styles from './Board.module.css';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import axios from 'axios';

// export default function BoardCreate() {

//   const classId = window.location.pathname.split('/')[2];

//   // const [ board, setBoards ] = useState({
//   //   title: '',
//   //   content: ''
//   // });

//   // const handleChangeForm = (e) => {
//   //   setBoards({
//   //     ...board,
//   //     [e.target.name]: e.target.value
//   //   })
//   // }

//   console.log(board)
//   // const create = () => {
//   //   let url = `/notice-service/${classId}/notice`
//   //   let data = {
//   //     'title' : board.title,
//   //     'content' : board.content
//   //   }
//   //   var config={
//   //     headers: {
//   //       'Content-Type' : 'application/json',
//   //       'Authorization': sessionStorage.token
//   //     }
//   //   }
//   //   axios.post(url, data, config)
//   //   .then(res => {
//   //     alert("성공")
//   //   }).catch(err => {
//   //     alert("실패")
//   //   })
//   // };

//   return (
//     <Fragment>
//       <div>
//         <input className={styles.titleinput} type='text' name="title" placeholder='제목을 입력해주세요' value={title} onChange={handleChangeForm} />
//         <CKEditor
//           editor={ClassicEditor}
//           data={content}
//           onReady={editor => {
//             // You can store the "editor" and use when it is needed.
//             console.log('Editor is ready to use!', editor);
//           }}
//           onChange={(event, editor) => {
//             const data = editor.getData();
//             console.log({ event, editor, data });
//           }}
//           onBlur={(event, editor) => {
//             console.log('Blur.', editor);
//           }}
//           onFocus={(event, editor) => {
//             console.log('Focus.', editor);
//           }}
//         />
//       </div>
//       {/* <button onClick={create}>저장</button> */}
//     </Fragment>
//   )
// };
