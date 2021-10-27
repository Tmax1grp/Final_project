import React,{useEffect, useState} from 'react';
import ClassBoardList from '../widgets/ClassBoardList';
import axios from 'axios';


// TODO: 한 페이지 게시글 최대 개수 지정 혹은 스크롤링
export default function ClassBoardNotice({ classId }) {

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:9999/lectures/${classId}/notice/{noticeId}`)
        .then(res => {
            console.log(res.data)
            setClasses(res.data);
        })
        .catch((err) =>
          console.log(err)
        )
      },[])


    return (
        <div>
            <table class="table table-sm">
  <thead>
    <tr>
      <th scope="col">목록</th>
      <th scope="col">작성자</th>
      <th scope="col">제목</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
            {/* <ClassBoardList name="notice" classId={classId} /> */}
        </div>
    );
}