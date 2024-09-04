import React, { useState } from 'react';
import './Counter.css'; 

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-container">
      <h1 className="counter-title">Counter</h1>
      <p className="counter-display">{count}</p>
      <div className="button-group">
        <button className="counter-button increase" onClick={() => setCount(count + 1)}>Increase</button>
        <button className="counter-button decrease" onClick={() => setCount(count - 1)}>Decrease</button>
        <button className="counter-button reset" onClick={() => setCount(0)}>Set to Zero</button>
      </div>
    </div>
  );
};

export default Counter;
