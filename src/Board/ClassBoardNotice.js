import React,{useEffect, useState} from 'react';
import ClassBoardList from '../widgets/ClassBoardList';
import axios from 'axios';

// TODO: 한 페이지 게시글 최대 개수 지정 혹은 스크롤링
export default function ClassBoardNotice({ classId }) {

  const [classes, setClasses] = useState([]);
  const [notice, setNotice] = useState([]);
  const [ss, setSs] = useState("");

  useEffect(() => {
    axios.get(`http://192.168.201.129:8000/notice/${classId}/notice/all`)
    .then(res => {
      // console.log(res.data)
      setClasses(res.data);
    })
    .catch((err) =>
    console.log(err)
    )
  },[classId])
    
  const classeslist = classes.map((clas) => {
    const aaaa = () => {
      let clickCnt = 1
      axios.get(`http://192.168.201.129:8000/notice/${classId}/notice/${clas.noticeId}`, {
        params: {
          clickCnt : 0
        }
      })
    }

    return (
      <tr>
        <th scope="row">{clas.noticeId}</th>
        <td><button onClick={aaaa}><a href={`/notice/${classId}/notice/${clas.noticeId}`}>{clas.title}</a></button></td>
        {/* <td><button onClick={aaaa}>{clas.title}</button></td> */}
        <td>{clas.author}</td>
        <td>{clas.createDate}</td>
        <td>{clas.clickCnt}</td>
      </tr>
      )
    }
  )

  useEffect(() => {
    axios.get(`http://192.168.201.129:8000/notice/${classId}/notice/all`)
    .then(res => {
      // console.log(res.data)
      setNotice(res.data);
    })
  },[classId])

  function SearchBar(){
    return(
      <table className={"talbe"}>
        <tr>
          <td>
            <input type={"text"} size={"25"} className={"input-sm"} placeholder={"search"}/>
          </td>
        </tr>
      </table>
    )
  }

  const handleChange =(e)=>{
    console.log(e.target.value);
  }

  return (
    <div>
      <table className= {"table"}>
        <tr>
          <td>  
            <input type={"text"} className={"input-sm"} size={"10"} onChange={handleChange} placeholder={"search"}/>
          </td>
        </tr>
      </table>
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