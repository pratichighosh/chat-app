import React, { useState } from 'react';

const LeftMenu = ({ users = [], onUserSelect = () => {} }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const safeUsers = Array.isArray(users) ? users : [];

  return (
    <div className={`bg-gray-100 h-full transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="mb-4 p-2 rounded hover:bg-gray-200 w-full flex items-center justify-center"
        >
          {isCollapsed ? '→' : '←'}
        </button>

        {!isCollapsed && (
          <>
            <h2 className="text-lg font-semibold mb-4">Users</h2>
            <ul className="space-y-2">
              {safeUsers.length > 0 ? (
                safeUsers.map((user) => (
                  <li
                    key={user.id}
                    className="cursor-pointer p-2 hover:bg-gray-200 rounded"
                    onClick={() => onUserSelect(user)}
                  >
                    {user.username || user.name || 'Unnamed User'}
                  </li>
                ))
              ) : (
                <li className="text-gray-500 p-2">No users available</li>
              )}
            </ul>
          </>
        )}

        {isCollapsed && (
          <div className="flex flex-col items-center space-y-4">
            <span title="Users" className="cursor-pointer">👥</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftMenu;