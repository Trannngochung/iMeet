import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // để dùng link sang login
import './Signup.css';
import ImgAsset from '../public';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log('Form submitted:', formData);
    // call API signup ở đây
  };

  return (
    <div className="signup">
      {/* Left side */}
      <div className="signup-container">
        <div className="signup-box">
          <div className="signup-header">
            <h2 className="signup-title">Sign Up</h2>
            <p className="signup-subtext">Create your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label" htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                className="input-field"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                className="input-field"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                className="input-field"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                className="input-field"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Text dưới confirm password */}
            <p className="signup-text">
              Have an account? <Link to="/login" className="signup-link">Log in</Link>
            </p>

            <div className="signup-button">
              <button type="submit" className="input-field">Sign Up</button>
            </div>
          </form>
        </div>
      </div>

      {/* Right side */}
      <img
        className="signup-image"
        src={ImgAsset.Signup_chrislee70l1tDAI6rMunsplash1}
        alt="Signup background"
      />
    </div>
  );
}
