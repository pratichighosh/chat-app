import React from 'react';

const MainContent = ({ children }) => {
  return (
    <main className="flex-1 p-4 bg-white overflow-auto">
      {children}
    </main>
  );
};

export default MainContent;
