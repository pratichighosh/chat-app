import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-blue-600 text-white p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Chat App</Link>
        <div className="flex gap-4">
          <Link to="/login" className="hover:text-blue-200">Login</Link>
          <Link to="/register" className="hover:text-blue-200">Register</Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;