import logo from './logo.svg';
import './App.css';
import Menu from './Menu';
import Login from './Login';
import Footer from './Footer';
import Container from './Container';
import Counter from './Counter';
import Todo from './Todo';
import Hobby from './Hobby';
import Add from './Add';
import Degree from './Degree';
import Student from './StudentObj';
import Gender from './Gender';
import Fake from './Fake';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
                <nav className="nav-bar">
                    <Link to="/gender" className="nav-link">Gender</Link>
                    <Link to="/fake" className="nav-link">Fake</Link>
                </nav>
                <br />
                <Routes>
                    <Route path="/gender" element={<Gender />} />
                    <Route path="/fake" element={<Fake />} />
                </Routes>
            </BrowserRouter>
    </div>
          
  );
}

export default App;
