import React from 'react';
import { Title } from '@mantine/core';
import LoginForm from 'common/components/molecules/LoginForm/LoginForm';
import { Link } from 'react-router-dom';

interface LoginSectionProps {
  onLogin: () => void;
}

const LoginSection: React.FC<LoginSectionProps> = ({ onLogin }) => {
  
  return (
    <section className="login-section">
      
      <LoginForm onLogin={onLogin} />
      
    </section>
  );
};

export default LoginSection;
