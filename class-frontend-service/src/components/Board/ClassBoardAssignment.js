import React,{useEffect, useState} from 'react';
import ClassBoardList from '../widgets/ClassBoardList'
import axios from 'axios';

// TODO: 한 페이지 게시글 최대 개수 지정 혹은 스크롤링
export default function ClassBoardReference({ classId }) {


    const [classes, setClasses] = useState([]);


    useEffect(() => {
        axios.get(`/${classId}/assignment/findall`)
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
      <th scope="row">{clas.referenceId}</th>
      <td>{clas.title}</td>
      <td>{clas.author}</td>
      <td>{clas.createDate}</td>
    </tr>
            
        )
    })

    return (
        <div>
            <table class="table table-sm">
  <thead>
    <tr>
      <th scope="col">목록</th>
      <th scope="col">제목</th>
      <th scope="col">작성자</th>
      <th scope="col">날짜</th>
    </tr>
  </thead>
  <tbody>
    
      {classeslist}
   
  </tbody>
</table>
            {/* <ClassBoardList name="assignment" classId={classId} /> */}
        </div>
    );
}