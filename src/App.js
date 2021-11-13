import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import Main from './Main/Main';
import Home from './Home/Home';
import Lecture from './Lecture/Lecture';
import Signup from './Account/Signup';
import Login from './Account/Login';
import ClassroomMain from './Classroom/ClassroomMain';
import Admin from './Admin/Admin';
import ClassInfo from './ClassInfo/ClassInfo';
import Mypage from './Mypage/Mypage';
import ClassDetailNotice from './Board/ClassDetailNotice';
import BoardCreate from './Board/BoardCreate';

function App() {

  // axios.defaults.baseURL = 'http://192.168.201.129:8000'
  axios.defaults.baseURL = 'http://192.168.201.108:8000'

  return (
    <BrowserRouter>
      {/* <ToTop> */}
        <Switch>             
          <Route exact path="/"><Main /></Route>
          <Route exact path="/home"><Home /></Route>
          <Route exact path="/lecture"><Lecture /></Route>
          <Route exact path="/signup"><Signup /></Route>
          <Route exact path="/login"><Login /></Route>
          <Route exact path="/classroommain/:classId" ><ClassroomMain/></Route>
          <Route exact path="/admin"><Admin/></Route>
          <Route exact path="/classinfo"><ClassInfo/></Route>
          <Route exact path="/mypage"><Mypage/></Route>
          <Route exact path="/classdetailnotice/:noticeId"><ClassDetailNotice/></Route>
          <Route exact path="/boardcreate/:classId"><BoardCreate/></Route>
        </Switch>
      {/* </ToTop> */}
    </BrowserRouter>
  );
}

export default App;