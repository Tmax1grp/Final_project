import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import ClassBoardSearchMenu from './ClassBoardSearchMenu';

// TODO: 한 페이지 게시글 최대 개수 지정 혹은 스크롤링
export default function ClassBoardReference({ classId }) {
  const [keyword, setKeyword] = useState({
    keywordType: 0,
    keywordValue: null
  });
  const [filtered, setFiltered] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios.get(`/reference-service/${classId}/reference/all`)
      .then(res => {
        // console.log(res.data);
        setClasses(res.data);
        setFiltered(res.data);
      })
      .catch((err) =>
        console.log(err)
      )
    // setFiltered(classes);
  }, [classId])

  useEffect(() => {
    if (keyword.keywordValue != null) {
      let searchType = parseInt(keyword.keywordType);
      let searchValue = keyword.keywordValue;
      // console.log("searchType: " + searchType);
      // console.log("searchValue: " + searchValue);

      switch (searchType) {
        case 0: {
          setFiltered(classes.filter(item => item.author.includes(searchValue)));
          break;
        }
        case 1: {
          setFiltered(classes.filter(item => item.title.includes(searchValue)));
          break;
        }
        default: {
          console.log("ERROR: Invalid Search Keyword Type");
          // setFiltered(classes);
          break;
        }
      }
    }
  }, [keyword])

  // 게시글 목록
  var classesList = filtered.map((clas) => {
    const enterreferencedetail = () => {
      let clickCnt = 1
      axios.get(`/reference-service/${classId}/reference/${clas.referenceId}`, {
        params: {
          clickCnt: 0
        }
      })
    }
    // 게시글 작성일 raw 데이터 편집
    if (clas.createDate != null) {
      var dateRaw = clas.createDate;
      var createDate = '';
      var createTime = '';
      createDate = dateRaw.split("T")[0];
      createTime = dateRaw.split("T")[1];
      createTime = createTime.split(":")[1] + ":" + createTime.split(":")[2];
    }

    return (
      <tr>
        <th scope="row">{clas.referenceId}</th>
        <td>
          <button onClick={enterreferencedetail}>
            <a href={`/reference-service/${classId}/reference/${clas.referenceId}`}>{clas.title}</a>
          </button>
        </td>
        <td>{clas.author}</td>
        <td>{createDate + " " + createTime}</td>
        <td>{clas.clickCnt}</td>
      </tr>
    )
  })

  return (
    <div>
      <h4>수업자료</h4>
      <div className="row">
        <div className="col-2">
          <Link to={{
            pathname: `/boardcreate/${classId}`,
            state: {
              selects : "자료게시판"
            }
          }}>
            <i class="fas fa-pen-square fa-2x" style={{ color: "black" }}></i>
          </Link>
        </div>
        <div className="col-10">
          <ClassBoardSearchMenu keyword={keyword} setKeyword={setKeyword} />
        </div>
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">번호</th>
            <th scope="col">제목</th>
            <th scope="col">작성자</th>
            <th scope="col">등록일</th>
            <th scope="col">조회수</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ?
            classesList
            :
            <>검색된 게시글이 없습니다!</>
          }
        </tbody>
      </table>
      {/* <ClassBoardList name="reference" classId={classId} /> */}
    </div>
  );
}