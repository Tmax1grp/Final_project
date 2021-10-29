import React,{useEffect, useState} from 'react';
import ClassBoardList from '../widgets/ClassBoardList';
import axios from 'axios';


// TODO: 한 페이지 게시글 최대 개수 지정 혹은 스크롤링
export default function ClassBoardNotice({ classId }) {

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        axios.get(`/notice/${classId}/notice/findall`)
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
            {/* <ClassBoardList name="notice" classId={classId} /> */}
        </div>
    );
}