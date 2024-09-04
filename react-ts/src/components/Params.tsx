import React from 'react';
import { useParams } from 'react-router-dom';
import './Params.css'; 

const Params: React.FC = () => {
    const { text } = useParams<{ text?: string }>(); 

    return (
        <div className="params-container">
            <h1 className="params-title">Params Component</h1>
            <p className="params-text">Message: <span className="params-value">{text}</span></p>
        </div>
    );
};

export default Params;
