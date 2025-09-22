import React, { useState, useEffect, useRef } from 'react';
import './Login.css';
import ImgAsset from '../public';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const history = useHistory();
  const isMountedRef = useRef(true);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Xử lý login bằng email/password
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8081/api/auth/login', formData);
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('username', response.data.username);

        history.push('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Đăng nhập thất bại. Vui lòng kiểm tra lại.');
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  };

  // Xử lý login bằng Google
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      
      if (!token) {
        throw new Error('No token received from Google');
      }

      const userInfo = jwtDecode(token);

      if (!userInfo || !userInfo.email) {
        throw new Error('Invalid user info from Google token');
      }

      console.log('Google login successful:', userInfo);

      const response = await axios.post('http://localhost:8081/api/auth/google', {
        token: token,
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
        googleId: userInfo.sub // Google ID
      });

      if (response.data.success) {
        // Lưu thông tin từ backend vào localStorage
        localStorage.setItem('google_token', token);
        localStorage.setItem('user_email', userInfo.email);
        localStorage.setItem('user_name', userInfo.name);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('username', response.data.username);

        history.push('/dashboard');
      } else {
        throw new Error(response.data.message || 'Backend authentication failed');
      }
    } catch (error) {
      console.error('Google login error:', error);
      alert('Đăng nhập Google thất bại. Vui lòng thử lại.');
    }
  };

  const handleGoogleError = () => {
    console.error('Google login failed');
    alert('Đăng nhập Google thất bại');
  };

  return (
    <div className='login'>
      <div className='login-container'>
        <div className='login-box'>
          <div className='login-header'>
            <span className='welcome-text'>Welcome back!</span>
          </div>
          <span className='sub-text'>Enter your credentials to access your account</span>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className='input-group'>
              <label className='input-label' htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className='input-field input-email'
                required
              />
            </div>

            {/* Password */}
            <div className='input-group'>
              <label className='input-label' htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className='input-field input-password'
                required
              />
            </div>

            <div className='signup-link'>
              <span>
                Don't have an account? <Link to="/signup" className="signup-link-text">Sign Up</Link>
              </span>
            </div>

            {/* Login button */}
            <button 
              type="submit" 
              className='login-button' 
              disabled={isLoading}
            >
              {isLoading ? 'Đang đăng nhập...' : 'Login'}
            </button>
          </form>

          {/* Divider */}
          <div className='divider'>
            <div className='line'></div>
            <div className='divider-text'><span>Or</span></div>
            <div className='line'></div>
          </div>

          {/* Google Login */}
          <div className='google-login-container'>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap={false}
              width="380"
              text="signin_with"
              shape="rectangular"
              theme="outline"
              size="large"
            />
          </div>
        </div>
      </div>

      <img
        className='login-image'
        src={ImgAsset.Signup_chrislee70l1tDAI6rMunsplash1}
        alt="Login background"
      />
    </div>
  );
}
