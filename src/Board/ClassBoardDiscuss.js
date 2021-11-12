import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ClassBoardSearchMenu from './ClassBoardSearchMenu';

// TODO: 한 페이지 게시글 최대 개수 지정 혹은 스크롤링
export default function ClassBoardDiscuss({ classId }) {
  const [keyword, setKeyword] = useState({
    keywordType: 0,
    keywordValue: null
  });
  const [filtered, setFiltered] = useState([]);
  const [discusses, setDiscusses] = useState([]);

  useEffect(() => {
    axios.get(`/discuss-service/${classId}/discuss/all`)
      .then(res => {
        // console.log(res.data);
        setDiscusses(res.data);
        setFiltered(res.data);
      })
      .catch((err) =>
        console.log(err)
      )
    // setFiltered(discusses);
  }, [classId])

  useEffect(() => {
    if (keyword.keywordValue != null) {
      let searchType = parseInt(keyword.keywordType);
      let searchValue = keyword.keywordValue;
      // console.log("searchType: " + searchType);
      // console.log("searchValue: " + searchValue);

      switch (searchType) {
        case 0: {
          setFiltered(discusses.filter(item => item.author.includes(searchValue)));
          break;
        }
        case 1: {
          setFiltered(discusses.filter(item => item.title.includes(searchValue)));
          break;
        }
        default: {
          console.log("ERROR: Invalid Search Keyword Type");
          // setFiltered(discusses);
          break;
        }
      }
    }
  }, [keyword])

  // 게시글 목록
  var discussList = filtered.map((clas) => {
    const enterdiscussdetail = () => {
      let clickCnt = 1
      axios.get(`/discuss-service/${classId}/discuss/${clas.discussId}`, {
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
        <th scope="row">{clas.discussId}</th>
        <td>
          <button onClick={enterdiscussdetail}>
            <a href={`/discuss-service/${classId}/discuss/${clas.discussId}`}>{clas.title}</a>
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
      <ClassBoardSearchMenu keyword={keyword} setKeyword={setKeyword} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">번호</th>
            <th scope="col">제목</th>
            <th scope="col">작성자</th>
            <th scope="col">등록일시</th>
            <th scope="col">조회수</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ?
            discussList
            :
            <>검색된 게시글이 없습니다!</>
          }
        </tbody>
      </table>
      {/* <ClassBoardList name="discuss" classId={classId} /> */}
    </div>
  );
}