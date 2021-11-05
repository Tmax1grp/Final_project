import React, { Fragment, useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';

import Navmenu from '../Home/Navmenu';
import ClassBoard from '../layout/ClassBoard';
import ClassSidebar from '../layout/ClassSidebar';
import ClassHeader from '../layout/ClassHeader';
import Footbar from '../Home/Footbar';

export default function ClassroomMain(){

  const [activeBoard, setActiveBoard] = useState(0);
  const [classId, setClassId] = useState(-1);

  useEffect(() => {
    // TODO: 현재 url 혹은 sessionStorage에서 classroom_id를 불러온다.
    // (1)
    // let url = window.location.href
    // let urlArr = url.split('/')
    // let classID = parseInt(urlArr[urlArr.length-1])
    // setClassID(classID) 
    // 혹은 다른 구현 방법이 있으면 사용
    setClassId(120);
  }, [])

  console.log(classId)

  return(
    <Fragment>
      <Navmenu />
      <ClassHeader />
      <Row>
        <Col>
          <ClassSidebar setActiveBoard={setActiveBoard} />
        </Col>
        <Col>
          <ClassBoard classId={classId} activeBoard={activeBoard} />
        </Col>
      </Row>
      <Footbar />
    </Fragment>
  );
}

