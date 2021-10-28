import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

export default function Signup() {

  const [ values, setValues ] = useState({
    email: '',
    username: '',
    password: '',
    confirmpwd: '',
    tel: ''
  })

  const [ emailcheck, setEmailcheck ] = useState()
  
  // 이메일 중복검사
  const checkEmail = (e) => {
    e.preventDefault();
    let email = {
      'email': values.email
    }
    let url = '/user-service/duplicatedEmail'
    var config={
      header: {
        'Content-Type' : 'application/json',
      }
    }
    axios.post(url, email, config)
    .then(res => res.status)
    .then(status => {
      if(status === 200){
        alert("사용가능한 email입니다.");
        setEmailcheck(200)
      }
      else {
        alert("이미 사용 중인 email입니다.")
      }
    });
  }

  const join = (e) => {
    e.preventDefault();
    let emailpattern = /^(([^<>()\].,;:\s@"]+(\.[^<>()\].,;:\s@"]+)*)|(".+"))@(([^<>()¥[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    let pwdpattern = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*#?&]).*$/;
    let telpattern = /^[0-9\b -]{0,13}$/;   
    let url = '/user-service/users'
    let User = {
      'email' : values.email,
      'emailcheck' : emailcheck,
      'userName' : values.username,
      'password' : values.password,
      'tel' : values.tel
    }
    var config={
      header:{
        'Content-Type' : 'application/json',
      }
    };
    if(emailpattern.test(values.email)===false){
      alert("이메일 형식에 맞게 작성해 주세요.")
      return;
    }
    if(emailcheck !== 200){
      alert("이미 사용 중인 이메일입니다.")
      return;
    }
    if(pwdpattern.test(values.password)===false){
      alert("숫자,문자,특수문자를 조합해서 최소 8자 이상 입력해 주세요.")
      return;
    }
    if(telpattern.test(values.tel)===false){
      alert("숫자만 입력해 주세요.( ex : 01098765432 )")
      return;
    }
    axios.post(url, User, config)
    .then((res)=>{
      alert("회원가입완료")
      console.log(res);
      document.location.href = '/'
    }).catch(error => {
      alert("회원가입실패")
      console.log(error);
    })
  }

  const handleChangeForm = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }


  return (
    <div className="App">
      <header className="App-header">
        <Link to="/"><h2>재택학습 플랫폼</h2></Link>
        <div className="container">
          <form>
            <h1>
              회원가입
            </h1>
            <div className="form-content">
              <input id="email" name="email" placeholder="email" type="email" value={values.email} onChange={handleChangeForm}/>
              <div className="button2" onClick={checkEmail}>중복확인</div>
              <input id="username" name="username" placeholder="username" type="text"  value={values.username} onChange={handleChangeForm}/>
              <input id="password" name="password" placeholder="password" type="password"  value={values.password} onChange={handleChangeForm}/>
              <input id="confirmpwd" name="confirmpwd" placeholder="password check" type="password"  value={values.confirmpwd} onChange={handleChangeForm}/>
              <input id="phone" name="tel" placeholder="phone" type="tel"  value={values.tel} onChange={handleChangeForm} maxLength="13"/>
              <div className="button" type="submit" onClick={join}>
                등록
              </div>
              <div className="signup-message">
                <a href="/login">이미 회원이신가요? 로그인하기</a>
              </div>
            </div>
          </form>
        </div>
      </header>
    </div>
  )
}