import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

export default function Signup() {

  const [ values, setValues ] = useState({
    email: '',
    password: '',
  })

  const handleChangeForm = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const onClickLogin = (e) => {
    e.preventDefault();
    let url = '/user-service/login'
    let User = {
      'email':values.email,
      'password':values.password
    }
    
    var config={
      header:{
        'Content-Type' : 'application/json',
      }
    }
    axios.post(url, User, config, {withCredentials: true})
    .then(res => {
      console.log(res.data)
      if(res.data.email === undefined){
        // email 일치하지 않는 경우 email = undefined, msg = '입력하신 email이 일치하지 않습니다.'
        console.log('======================',res.data.msg)
        alert('입력하신 email이 일치하지 않습니다.')
    } else if(res.data.email === null){
        // email은 있지만, pw 는 다른 경우 email = null , msg = undefined
        console.log('======================','입력하신 비밀번호가 일치하지 않습니다.')
        alert('입력하신 비밀번호가 일치하지 않습니다.')
    } else if(res.data.email === values.email) {
        // email, pw 모두 일치 email = email1, msg = undefined
        console.log('======================','로그인 성공')
        sessionStorage.setItem('email', res.data.email)
        sessionStorage.setItem('token', res.data.token)
        sessionStorage.setItem('userId', res.data.userId)
        sessionStorage.setItem('userName', res.data.userName)
        sessionStorage.setItem('tel', res.data.tel)
    }
    // 로그인하면 메인페이지로 이동
    if (sessionStorage.userName == 'admin') {
      document.location.href = './admin'
    } else {
      document.location.href = '/home'
    }
    
  })
  .catch()
  }

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/" style={{textDecorationLine:"none"}}><h1 style={{color:"#FFCA95"}}>NICE TO MEET</h1></Link>
        <div className="container">
          <form action="index.html" method="post">
            <h2 style={{color:"#20314E"}}>
              로그인
            </h2>
            <div className="form-content">
              <input id="email" name="email" placeholder="email" type="email" value={values.email} onChange={handleChangeForm}/>
              <input id="password" name="password" placeholder="password" type="password" style={{fontWeight:"bold"}} value={values.password} onChange={handleChangeForm}/>
              <div className="button" onClick={onClickLogin} style={{fontSize:"1.5rem", height:"50px"}}>
                <p style={{margin:"-0.5rem"}}>로그인</p>
              </div>
              {/* <Link to="/">아이디찾기</Link> 
              <Link to="/">비밀번호찾기</Link> */}
              <div className="signup-message">
                <a href="/signup" style={{color:"#20314E", textDecorationLine:"none"}}>회원이 아니신가요? 회원가입하기</a>
              </div>
            </div>
          </form>
        </div>
      </header>
    </div>
  )
}