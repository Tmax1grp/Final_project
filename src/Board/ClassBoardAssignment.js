import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pagination, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

import ClassBoardSearchMenu from './ClassBoardSearchMenu';

export default function ClassBoardAssignment({ setBoardStatus, setArticleId, classId }) {
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
    axios.put(`/assignment-service/${classId}/assignment/search/${pageNum}`, null, {
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
    const enterassignmentdetail = () => {
      let clickCnt = 1
      axios.get(`/assignment-service/${classId}/assignment/${clas.assignmentId}`, {
        params: {
          clickCnt: 0
        }
      })
    }

    const handleOpenArticle = () => {
      setArticleId(clas.assignmentId);
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
      <TableRow>
        <TableCell scope="row">{clas.assignmentId}</TableCell>
        <TableCell>
          <button className="boardlink" onClick={() => { enterassignmentdetail(); handleOpenArticle(); }}>
            {clas.title}
          </button>
        </TableCell>
        <TableCell>{clas.userName}</TableCell>
        <TableCell>{createDate}</TableCell>
        <TableCell>{clas.clickCnt}</TableCell>
      </TableRow>
    )
  })

  return (
    <>
    <h4>과제게시판</h4>
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
      <TableContainer>
        <Table className="table">
          <TableHead className="thead-dark">
            <TableRow>
              <TableCell scope="col">번호</TableCell>
              <TableCell scope="col">제목</TableCell>
              <TableCell scope="col">작성자</TableCell>
              <TableCell scope="col">등록일</TableCell>
              <TableCell scope="col">조회수</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              classes.length > 0 ?
                classesList
                :
                <>검색된 게시글이 없습니다!</>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={totalPages} page={pageNum} onChange={handlePageSelect} />
    </>
  );
}