import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pagination } from '@mui/material'

import ClassBoardSearchMenu from './ClassBoardSearchMenu';

// TODO: 한 페이지 게시글 최대 개수 지정 혹은 스크롤링
export default function ClassBoardReference({ setBoardStatus, setArticleId, classId }) {
  const [totalPages, setTotalPages] = useState(10);
  const [pageNum, setPageNum] = useState(1);
  const [keyword, setKeyword] = useState({
    keywordType: 0,
    keywordValue: null
  });
  const [searchValues, setSearchValues] = useState({
    userName: "",
    title: ""
  });
  const [classes, setClasses] = useState([]);
  const handlePageSelect = (e, value) => {
    setPageNum(value);
  }

  useEffect(() => {
    axios.put(`/reference-service/${classId}/reference/search/${pageNum}`, null, {
      params: {
        userName: searchValues.userName,
        title: searchValues.title,
      }
    })
      .then(res => {
        setClasses(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) =>
        console.log(err)
      )
  }, [classId, pageNum, searchValues])

  useEffect(() => {
    if (keyword.keywordValue != null) {
      let searchType = parseInt(keyword.keywordType);
      let searchValue = keyword.keywordValue;
      switch (searchType) {
        case 0: {
          setSearchValues({
            "userName": searchValue,
            "title": ""
          })
          break;
        }
        case 1: {
          setSearchValues({
            "userName": "",
            "title": searchValue
          })
          break;
        }
        default: console.log("ERROR: Invalid Search Keyword Type");
      }
      setPageNum(1);
    }
  }, [keyword])

  // 게시글 목록
  var classesList = classes.map((clas) => {
    const enterreferencedetail = () => {
      let clickCnt = 1
      axios.get(`/reference-service/${classId}/reference/${clas.referenceId}`, {
        params: {
          clickCnt: 0
        }
      })
    }

    const handleOpenArticle = () => {
      setArticleId(clas.referenceId);
      setBoardStatus(1);
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
          <button className="boardlink" onClick={() => { enterreferencedetail(); handleOpenArticle(); }}>
            {clas.title}
          </button>
        </td>
        <td>{clas.userName}</td>
        <td>{createDate}</td>
        <td>{clas.clickCnt}</td>
      </tr>
    )
  })

  return (
    <>
      <h4>자료게시판</h4>
      {/*게시글 보드 상단 바 */}
      <div className="row">
        <div className="col-2">
          <button className="writebutton" onClick={() => { setBoardStatus(2) }}>
            <i className="fas fa-pen-square fa-2x"></i>
          </button>
        </div>
        <div className="col-10">
          <ClassBoardSearchMenu keyword={keyword} setKeyword={setKeyword} />
        </div>
      </div>

      {/*게시글 목록*/}
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
          {
            classes.length > 0 ?
              classesList
              :
              <>검색된 게시글이 없습니다!</>
          }
        </tbody>
      </table>
      <Pagination count={totalPages} page={pageNum} onChange={handlePageSelect} />
    </>
  );
}