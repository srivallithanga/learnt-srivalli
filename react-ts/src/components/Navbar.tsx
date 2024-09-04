import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">MyApp</h1>
        <ul className="navbar-menu">
          <li className="navbar-item"><Link className="navbar-link" to="/">Home</Link></li>
          <li className="navbar-item"><Link className="navbar-link" to="/todo">Todo</Link></li>
          <li className="navbar-item"><Link className="navbar-link" to="/counter">Counter</Link></li>
          <li className="navbar-item"><Link className="navbar-link" to="/params/Hello Sri">Params</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
