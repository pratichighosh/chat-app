import React, { useState, useEffect } from 'react';
import ChatInterface from '../components/ChatInterface';

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="h-full">
      {selectedUser ? (
        <ChatInterface selectedUser={selectedUser} />
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-bold mb-6">Select a User to Chat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map(user => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    {user.username[0].toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-medium">{user.username}</h3>
                    <p className="text-sm text-gray-500">{user.status || 'Online'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
