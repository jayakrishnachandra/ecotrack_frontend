import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.css'; // Ensure this import is present

export default function Navbar() {
  const location = useLocation(); // Get the current location

  return (
    <div>
      <ul className="nav nav-tabs" style={{ backgroundColor: "", alignItems: 'center' }}>
        <li className="nav-item">
          <div className="branding">
            <p className="branding-text">EcoTrack</p>
          </div>
        </li>
        <li className={`nav-item  ${location.pathname === '/current-usage' ? 'nav-link-active' : ''}`}>
          <Link className="nav-link nav-link-custom" to="/current-usage">Real-Time Usage</Link>
        </li>
        <li className={`nav-item  ${location.pathname === '/usage-charts' ? 'nav-link-active' : ''}`}>
          <Link className="nav-link nav-link-custom" to="/usage-charts">Consumption Insights</Link>
        </li>
        <li className={`nav-item  ${location.pathname === '/profile' ? 'nav-link-active' : ''}`}>
          <Link className="nav-link nav-link-custom" to="/profile">Profile</Link>
        </li>
      </ul>
    </div>
  );
}
