import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginSection from 'common/components/organisms/LoginSection';
import HomePage from 'pages/Homepage';
import RegistrationSection from 'common/components/organisms/RegistrationSection';
import axios from 'axios';
import ForgetPasswordSection from 'common/components/organisms/ForgetPasswordSection';
import ChangePasswordSection from 'common/components/organisms/ChangePasswordSection';
import { FiLogOut } from 'react-icons/fi';
import './App.scss'
const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      navigate('/login');
    }
  }, [accessToken, isLoggedIn, navigate]);

  const refreshToken = async () => {
    try {
      const response = await axios.get('https://asia-northeast1-willeder-official.cloudfunctions.net/api/auth/refresh');
      const newAccessToken = response.data.accessToken;
      setAccessToken(newAccessToken);
      localStorage.setItem('accessToken', newAccessToken);
    } catch (error) {
      console.error('Error refreshing access token:', error);
      setIsLoggedIn(false);
      localStorage.removeItem('accessToken');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route
        path="/login"
        element={
          !isLoggedIn ? (
            <LoginSection onLogin={() => setIsLoggedIn(true)} />
          ) : (
            <Navigate to="/home" />
          )
        }
      />
      <Route
        path="/home"
        element={
          isLoggedIn ? (
            <div>
             <div className="header">
      <div className="header-left">
        <h1>Home Page</h1>
      </div>
      <div className="header-right">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
              <HomePage accessToken={accessToken} refreshToken={refreshToken} />
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/register" element={<RegistrationSection />} />
      <Route path="/forgot-password" element={<ForgetPasswordSection />} />
      <Route path="/user/password/reset/:token" element={<ChangePasswordSection />} />
    </Routes>
  );
};

export default App;
