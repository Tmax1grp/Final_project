import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import ClassroomPage from './pages/ClassroomPage';
import LecturePage from './pages/LecturePage';

function App() {
  return (
    <Router className="App">
      <Route exact path="/classroom/:classId" component={ClassroomPage} />
      <Route exact path="/lecture/:classId" component={LecturePage} />
    </Router>
  );
}

export default App;
