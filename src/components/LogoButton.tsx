import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoButton = () => {
  const navigate = useNavigate();

  return (
    <div className="logo-container">
      <img
        src="/logo.png"
        onClick={() => navigate('/')}
        className="w-40 h-16 min-w-40 min-h-16 cursor-pointer"
      />
    </div>
  );
};

export default LogoButton;
