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
// import Classpage from './pages/ClassPage';

function App() {

  axios.defaults.baseURL = 'http://192.168.201.129:8000'

  return (
    <BrowserRouter>
      {/* <ToTop> */}
        <Switch>             
          <Route exact path="/"><Main /></Route>
          <Route exact path="/home"><Home /></Route>
          <Route exact path="/lecture"><Lecture /></Route>
          <Route exact path="/signup"><Signup /></Route>
          <Route exact path="/login"><Login /></Route>
          <Route exact path="/classroommain"><ClassroomMain/></Route>
        </Switch>
      {/* </ToTop> */}
    </BrowserRouter>
  );
}

export default App;