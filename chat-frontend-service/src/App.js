import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <Router className="App">
      <Route exact path="/classroom/:classId" component={ChatPage} />
    </Router>
  );
}

export default App;
