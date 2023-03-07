import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Auth from './components/Auth/Auth';
import Header from './components/Header/Header';
import Homepage from './pages/Homepage/Homepage';
import TopicDetail from './pages/TopicDetail/TopicDetail'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Header />
          <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/topic/:topicId" element={<TopicDetail />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
