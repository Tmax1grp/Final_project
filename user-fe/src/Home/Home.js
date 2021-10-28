import React, { Fragment, useEffect, useState } from 'react';
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

  const [ scroll, setScroll ] = useState(0);

  useEffect(()=>{
    // const header = document.querySelector(".sticky-bar");
    window.addEventListener("scroll", handleScroll);
    return() => {
      window.removeEventListener("scroll", handleScroll);
    }
  },[]);

  const handleScroll = () => {
    setScroll(window.scrollY);
  }

  return(
    <Fragment>
      <div className={
        scroll ? "header-padding-1 sticky-bar header-res-padding clearfix stick" 
        : "header-padding-1 header-res-padding clearfix stick"
        }
        >
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-7 col-lg-8 col-md-6 col-4">
              <a href="/">Home</a>
            </div>
            <div className="col-xl-5 col-lg-6 col-md-6 col-10">
              <div className="header-right-wrap px-4">
                {/* 회원가입 */}
                {
                  sessionStorage.userId !== undefined ?
                  null : 
                  <Link to="/singup">회원가입</Link>
                }
                {/* 로그인한 user */}
                {
                  sessionStorage.userId !== undefined ?
                  <p>{sessionStorage.userName}님</p> : null
                }
                {/* 로그인, 로그아웃 */}
                {
                  sessionStorage.userId !== undefined ?
                  <button type="button" className="btn btn-outline-primary" onClick={Logout}>로그아웃<i className="fas fa-sign-out-alt"></i></button> :
                  <button type="button" className="btn btn-outline-primary" onClick={Login}>로그인</button> 
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <a href='http://10.10.20.36:3001'>강의실</a> <br/>
    </Fragment>
  );
}