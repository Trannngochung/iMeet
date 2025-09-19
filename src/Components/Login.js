import React from 'react'
import './Login.css'
import ImgAsset from '../public'
import { Link } from 'react-router-dom' // để dùng link sang signup

export default function Login() {
	return (
		<div className='login'>
			<div className='login-container'>
				<div className='login-box'>
					<div className='login-header'>
						<span className='welcome-text'>Welcome back!</span>
					</div>
					<span className='sub-text'>Enter your credentials to access your account</span>

					{/* Username */}
					<div className='input-group'>
						<label className='input-label' htmlFor="username">Username</label>
						<input
							id="username"
							type="text"
							placeholder="Enter your username"
							className='input-field input-username'
						/>
					</div>

					{/* Password */}
					<div className='input-group'>
						<label className='input-label' htmlFor="password">Password</label>
						<input
							id="password"
							type="password"
							placeholder="Enter your password"
							className='input-field input-password'
						/>
					</div>


					<div className='signup-link'>
						<span>
							Don’t have an account? <Link to="/signup" className="signup-link-text">Sign Up</Link>
						</span>
					</div>

					{/* Login button */}
					<button className='login-button'>Login</button>

					{/* Divider */}
					{/* 
					<div className='divider'>
						<div className='line'></div>
						<div className='divider-text'>
							<span>Or</span>
						</div>
						<div className='line'></div>
					</div>

					{/* Social login */}
					{/*
					<div className='social-login'>
						<div className='google-login'>
							<img className='google-icon' src={ImgAsset.Login_Vector} alt="Google" />
							<span>Sign in with Google</span>
						</div>
						
						<div className='apple-login'>
							<img className='apple-icon' src={ImgAsset.Login_Vector_4} alt="Apple" />
							<span>Sign in with Apple</span>
						</div>
					</div>
					*/}

					{/* Forgot password */}
					{/*
					<span className='forgot-password'>Forgot password?</span>
					*/}
				</div>
			</div>

			<img className='login-image' src={ImgAsset.Signup_chrislee70l1tDAI6rMunsplash1} alt="Login background" />
		</div>
	)
}
