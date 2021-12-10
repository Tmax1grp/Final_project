import React from 'react';
import styles from './Class.module.css';

export default function ClassHeader( {clsname, teacher} ) {

  const goopenvidu = () => {
      window.location.href = "https://3.17.41.125:3000"
  }

  return (
    <nav className={`${styles.sun} row`}>
      <div className="col-10">
        <li className={styles.title}>{clsname}강의실 / </li>
        <li>{teacher}강사</li>
      </div>
      <div className="col-2" align="right" style={{padding:"2px 0"}}>       
        <button className={styles.sun_button} onClick={goopenvidu} style={{fontSize:"1.3rem", fontWeight:"bold", }}>실시간 강의</button>
      </div>
    </nav>
  );
}