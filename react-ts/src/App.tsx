import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Todo from './components/Todo';
import Counter from './components/Counter';
import Params from './components/Params';
import './App.css'; 

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/params/:text?" element={<Params />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
