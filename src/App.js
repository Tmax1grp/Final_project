import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Main from './Main/Main';
import Home from './Home/Home';

function App() {
  return (
    <BrowserRouter>
      {/* <ToTop> */}
        <Switch>             
          <Route exact path="/"><Main /></Route>
          <Route exact path="/home"><Home /></Route>
        </Switch>
      {/* </ToTop> */}
    </BrowserRouter>
  );
}

export default App;
