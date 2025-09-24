import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../redux/slices/authSlice';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, status, error } = useSelector((state) => state.auth || {});

  useEffect(() => {
    document.body.classList.add('auth-theme');
    return () => {
      document.body.classList.remove('auth-theme');
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="auth-page">
      <div className="auth-container auth-appear">
        <div className="auth-logo">
          <h2 className="logo-wordmark">Electrokart</h2>
        </div>
        <h2>Sign In</h2>

        <form onSubmit={submitHandler} className="auth-form">
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="auth-input auth-input-large" // large like registration
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="auth-input auth-input-large" // large like registration
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && status === 'failed' && <p className="error-message">{error}</p>}

          {/* Submit Button */}
          <button type="submit" className="btn-submit" disabled={status === 'loading'}>
            {status === 'loading' ? <span className="btn-spinner"></span> : 'Sign In'}
          </button>
        </form>

        {/* Redirect to registration */}
        <p className="auth-redirect-link">
          New to Electrokart? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
