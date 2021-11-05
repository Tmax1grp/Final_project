/*
ClassSidebar.js
- 강의실 좌측 메뉴, 클릭하여 게시판 선택
*/

import React, { Fragment, useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

// TODO: ToggleButton radio형으로 변경
export default function ClassSidebar({ setActiveBoard }) {
  console.log("set",setActiveBoard)
  const [radioValue, setRadioValue] = useState('0');

  const handleClick = (e) => {
    setActiveBoard(e.currentTarget.value);
    setRadioValue(e.currentTarget.value);
  };

  const radios = [
    { name: '홈', value: 0 },
    { name: '공지사항', value: 1 },
    { name: '강의 커리큘럼', value: 2 },
    { name: '과제 게시판', value: 3 },
    { name: '질문 게시판', value: 4 },
    { name: '자료 게시판', value: 5 }
  ];

  return (
    <Fragment>
      <ToggleButtonGroup vertical type="radio" name="radio" defaultValue={0}>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            value={radio.value}
            name="radio"
            checked={radioValue === radio.value}
            onChange={handleClick}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Fragment>
  );
}