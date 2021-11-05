import React,{useEffect, useState} from 'react';
import ClassBoardNotice from './ClassBoardNotice';
import axios from 'axios';

export default function ClassBoardNotice({ classId }) {

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        axios.get(`notice/${classId}/notice/{noticeId}`)
        .then(res => {
            // console.log(res.data)
            setClasses(res.data);
        })
        .catch((err) =>
          console.log(err)
        )
      },[classId])


      const classeslist = classes.map((clas) => {
        return (
    <tr>
      <th scope="row">{clas.noticeId}</th>
      <td>{clas.title}</td>
      <td>{clas.author}</td>
      <td>{clas.createDate}</td>
      <td>{clas.clickCnt}</td>
    </tr>
            
        )
    })

    return (
        <div>
            <table class="table table-sm">
  <thead>
    <tr>
      <th scope="col">번호</th>
      <th scope="col">제목</th>
      <th scope="col">작성자</th>
      <th scope="col">등록일</th>
      <th scope="col">조회수</th>
    </tr>
  </thead>
  <tbody>
      {classeslist}
   
  </tbody>
</table>
            {/* <ClassBoardList name="notice" classId={classId} /> */}
        </div>
    );
    
    
    
    }