import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {

  const Logout = () => {
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('userName')
    sessionStorage.removeItem('tel')
    document.location.href = '/'
  }

  const Login = () => {
    document.location.href = '/login'
  }

  return(
    <Fragment>
      <Link to="/singup">회원가입</Link><br />
      {/* 로그인, 로그아웃 */}
      {
        sessionStorage.userId !== undefined ?
        <button type="button" className="btn btn-outline-primary" onClick={Logout}>로그아웃<i className="fas fa-sign-out-alt"></i></button> :
        <button type="button" className="btn btn-outline-primary" onClick={Login}>로그인</button> 
      }
      {
        sessionStorage.userId !== undefined ?
        <p>{sessionStorage.userName}님</p> : null
      }
      <button type="button" className="btn btn-outline-primary" ><a href="/lecture">화상회의 생성</a></button>
    </Fragment>
  );
}