import React from "react";

export default function RightDog() {
  return(
    <div className='right'>
      <a href="/signup" className="start">시작하기</a>
      <div className='maintitle-right' style={{color:"#FFCA95", fontSize:"8em"}}>O MEET</div>
      <div className='dog'>
        <div className='ears2'></div>
        <div className='head2'>
          <div className='eyes2'></div>
          <div className='nose2'></div>
        </div>
        <div className='body2'>
          <div className='left-paw2'></div>
          <div className='right-paw2'></div>
        </div>
        <div className='tail2'></div>
        <div className='ORlaptop'>
          <div className='ORscreen'></div>
          <div className='ORkeyboard'></div>
        </div>
      </div>
    </div>
  );
}