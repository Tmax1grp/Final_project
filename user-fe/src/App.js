import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';

import Signup from './Account/Signup';
import Login from './Account/Login';
import Home from './Home/Home';

import axios from 'axios';

function App() {

  axios.defaults.baseURL = 'http://localhost:8000' 

  return (
    <BrowserRouter>
      <Switch> 
        <Route exact path="/"><Home /></Route>
        <Route exact path="/login"><Login /></Route>
        <Route exact path="/signup"><Signup /></Route>
        <Signup/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
