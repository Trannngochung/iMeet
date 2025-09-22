import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; // để dùng link sang login
import './Signup.css';
import ImgAsset from '../public';
import axios from 'axios';

export default function Signup() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Validate password when user types
    if (e.target.name === 'password') {
      validatePassword(e.target.value);
    }
  };

  const validatePassword = (password) => {
    const errors = [];
    
    if (password.length < 8) {
      errors.push('Mật khẩu phải có ít nhất 8 ký tự');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Mật khẩu phải có ít nhất 1 chữ viết hoa');
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('Mật khẩu phải có ít nhất 1 ký tự đặc biệt');
    }
    
    setPasswordErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(''); // Clear previous errors

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Mật khẩu xác nhận không khớp!');
      setIsLoading(false);
      return;
    }

    // Validate password requirements
    if (!validatePassword(formData.password)) {
      setErrorMessage('Mật khẩu không đáp ứng yêu cầu!');
      setIsLoading(false);
      return;
    }

    try {
      const signupData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName
      };

      const response = await axios.post('http://localhost:8081/api/auth/signup', signupData);
      
      if (response.data.success) {
        // Reset form
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          fullName: ''
        });
        setPasswordErrors([]);
        setShowPassword(false);
        setShowConfirmPassword(false);
        // Redirect đến login
        history.push('/login');
      }
    } catch (error) {
      console.error('Signup error:', error);
      
      // Handle different error types
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        
        if (errorData.message) {
          // Check for specific error messages
          if (errorData.message.includes('username') || errorData.message.includes('Username')) {
            setErrorMessage('Tên đăng nhập này đã được sử dụng!');
          } else if (errorData.message.includes('email') || errorData.message.includes('Email')) {
            setErrorMessage('Email này đã được sử dụng!');
          } else {
            setErrorMessage(errorData.message);
          }
        } else {
          setErrorMessage('Đã có lỗi xảy ra khi đăng ký. Vui lòng thử lại!');
        }
      } else if (error.response && error.response.status === 409) {
        setErrorMessage('Tài khoản với thông tin này đã tồn tại!');
      } else {
        setErrorMessage('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng!');
      }
    } finally {
      setIsLoading(false);
    }
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
              <label className="input-label" htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                className="input-field"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

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
              <div className="password-input-container">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input-field password-field"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {/* Password requirements */}
              <div className="password-requirements">
                <p className="requirements-title">Mật khẩu phải có:</p>
                <ul className="requirements-list">
                  <li className={formData.password.length >= 8 ? 'valid' : 'invalid'}>
                    Ít nhất 8 ký tự
                  </li>
                  <li className={/[A-Z]/.test(formData.password) ? 'valid' : 'invalid'}>
                    Ít nhất 1 chữ viết hoa
                  </li>
                  <li className={/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) ? 'valid' : 'invalid'}>
                    Ít nhất 1 ký tự đặc biệt
                  </li>
                </ul>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input-container">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="input-field password-field"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Error message */}
            {errorMessage && (
              <div className="error-message">
                {errorMessage}
              </div>
            )}

            {/* Text dưới confirm password */}
            <p className="signup-text">
              Have an account? <Link to="/login" className="signup-link">Log in</Link>
            </p>

            <div className="signup-button">
              <button 
                type="submit" 
                className="input-field" 
                disabled={isLoading}
              >
                {isLoading ? 'Đang đăng ký...' : 'Sign Up'}
              </button>
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
