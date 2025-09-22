import React from 'react';
import './Dashboard.css';

export default function Dashboard() {
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    window.location.href = '/login';
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {username}!</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="welcome-message">
          <h2>Chào mừng đến với iMeet!</h2>
          <p>Đây là trang dashboard của bạn. Bạn có thể bắt đầu sử dụng các tính năng từ đây.</p>
        </div>
      </div>
    </div>
  );
}
