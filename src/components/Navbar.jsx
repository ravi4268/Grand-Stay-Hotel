import React from 'react';

function Navbar({ toggleSidebar }) {
  return (
    <nav className="navbar">
      <button className="hamburger-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <div className="navbar-title">Grand Stay Hotel</div>
      <div className="navbar-profile">
        <span>Welcome, Sanidhya</span>
        <div className="avatar">S</div> 
      </div>
    </nav>
  );
}

export default Navbar;