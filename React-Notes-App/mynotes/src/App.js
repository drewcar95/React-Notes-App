import './App.css';
import Header from './components/Header'
import NotePage from './pages/NotePage';
import NotesListPage from './pages/NotesListPage';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


function App() {
  return (
    
      <div className="container dark">
        <div className='app'>
          <Router>
          <Header />
            <Routes>
                <Route path='/' exact element={<NotesListPage/>} />
                <Route path='/note/:id' element={<NotePage />} />
            </Routes>
          </Router>
        </div>
      </div>
  );
}

export default App;
