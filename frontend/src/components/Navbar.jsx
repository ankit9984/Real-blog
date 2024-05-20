import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import { TfiWrite } from "react-icons/tfi";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
  };

  const extractAlphabetsBeforeNumber = (email) => {
    const [localPart] = email.split('@');
    const match = localPart.match(/^[a-zA-Z]+/);
    return match ? match[0] : '';
  };

  return (
    <nav className="shadow-xl">
      <div className="container mx-auto flex justify-between items-center h-14">
        <div className="text-white text-lg flex">
          <Link to="/" className="flex items-center">
            <img src="/path/to/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
            YourLogo
          </Link>
          {location.pathname === '/new-story' && user && (
            <span className='text-black'>
              Draft in {extractAlphabetsBeforeNumber(user.email)}
            </span>
          )}
        </div>
        <div className="flex space-x-4">
          {user ? (
            <div className='flex justify-between items-center gap-5'>
              {location.pathname === '/new-story' ? (
                <button className='bg-green-400 text-white p-1 rounded-md text-xs'>Publish</button>
              ) : (
                <Link to='/new-story'>
                  <div className='flex gap-2 items-center'>
                    <TfiWrite />
                    <span>Write</span>
                  </div>
                </Link>
              )}
              <span className='text- font-bold text-xl'>{user.username}</span>
              {location.pathname !== '/new-story' && (
                <button onClick={handleLogout} className='bg-black text-white rounded-lg p-1'>Logout</button>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Login
              </Link>
              <Link to="/signup" className="bg-black hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
