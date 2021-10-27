import './App.css';
import ClassroomPage from './pages/ClassroomPage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Classpage from './pages/ClassPage';
import axios from 'axios';


function App() {

  axios.defaults.baseURL = 'http://localhost:56000'
  
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
