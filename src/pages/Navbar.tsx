import React, { useState } from 'react';
import { FiUser, FiLogOut } from 'react-icons/fi'; 
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login', { state: { from: '/' } });
};

  return (
    <nav>
      <div className="user-icon" onClick={() => setShowMenu(!showMenu)}>
        <FiUser />
        {showMenu && (
          <ul className="menu">
            <li onClick={handleLogout}>
              <FiLogOut />
              Logout
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
