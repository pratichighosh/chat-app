import React, { useEffect, useState } from 'react'; // Added useState import
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import LeftMenu from './components/LeftMenu';
import MainContent from './components/MainContent';
import RightPanel from './components/RightPanel';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let scale = 1;
      
      if (width >= 992 && width <= 1600) {
        scale = 0.9;
      } else if (width >= 700 && width <= 767) {
        scale = 0.8;
      } else if (width >= 600 && width <= 700) {
        scale = 0.75;
      } else if (width <= 600) {
        scale = 0.5;
      }
      
      document.documentElement.style.transform = `scale(${scale})`;
      document.documentElement.style.transformOrigin = 'top left';
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleUserSelect = (user) => {
    console.log('Selected user:', user);
    // Add your user selection logic here
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-16">
        <LeftMenu users={users} onUserSelect={handleUserSelect} />
        <MainContent>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/" element={<div>Welcome to Chat App</div>} />
          </Routes>
        </MainContent>
        <RightPanel />
      </div>
      <Footer />
    </div>
  );
};

export default App;