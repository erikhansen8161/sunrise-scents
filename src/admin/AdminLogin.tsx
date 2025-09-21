import React, { useState } from 'react';
import './AdminLogin.css';

interface AdminLoginProps {
  onLogin: (isLoggedIn: boolean) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple authentication - you can change these credentials
    if (username === 'admin' && password === 'sunrise2024') {
      localStorage.setItem('adminLoggedIn', 'true');
      onLogin(true);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <img src="/logo-horizontal.svg" alt="Sunrise Scents" className="login-logo" />
          <h1>Admin Panel</h1>
          <p>Manage your website content</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" className="login-btn">
            Login to Admin Panel
          </button>
        </form>
        
        <div className="login-help">
          <p><strong>Default Login:</strong></p>
          <p>Username: admin</p>
          <p>Password: sunrise2024</p>
          <small>You can change these credentials later</small>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
