import './App.css';
import ClassroomPage from './pages/ClassroomPage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Classpage from './pages/ClassPage';
import axios from 'axios';


function App() {

  axios.defaults.baseURL = 'http://10.10.20.36:8000'

  return (

    <BrowserRouter>
      <Switch>
    {/* <div className="App"> */}
      <Route exact path="/classpage"><Classpage/></Route>
      <ClassroomPage />
    {/* </div> */}
    </Switch>
    </BrowserRouter>
  );
}

export default App;
