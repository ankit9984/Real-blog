import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const {user, logout} = useContext(AuthContext)
  return (
    <nav className="shadow-xl">
      <div className="container mx-auto flex justify-between items-center h-14">
        <div className="text-white text-lg font-bold">
          <Link to="/" className="flex items-center">
            <img src="/path/to/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
            YourLogo
          </Link>
        </div>
        <div className="flex space-x-4">
         {user ? (
            <>
                <span className='text-black'>Welcom, {user.username}</span>
                <button>Logout</button>
            </>
         ): <>
         <Link to="/login" className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </Link>
          <Link to="/signup" className="bg-black hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Sign Up
          </Link>
         </>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
