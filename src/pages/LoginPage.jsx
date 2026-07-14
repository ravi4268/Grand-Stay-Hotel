import React, { useState } from 'react';

function LoginPage({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      setError('');
      onLogin(); 
    } else {
      setError('❌ Invalid Username or Password!');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <h2>🏨 Grand Stay</h2>
          <p>Hotel Management Suite</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}
          
          <div className="input-group">
            <label>Username</label>
            <input 
              type="text" 
              name="username" 
              placeholder="Enter admin username" 
              value={credentials.username} 
              onChange={handleInputChange} 
              required 
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Enter password" 
              value={credentials.password} 
              onChange={handleInputChange} 
              required 
            />
          </div>

          <button type="submit" className="login-btn">Sign In to Dashboard</button>
        </form>
        
        <div className="login-footer">
          <p>Demo Access Hint: <strong>admin</strong> / <strong>admin123</strong></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;