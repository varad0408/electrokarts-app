import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../redux/slices/authSlice';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, status, error } = useSelector((state) => state.auth || {});

  useEffect(() => {
    document.body.classList.add('auth-theme');
    return () => document.body.classList.remove('auth-theme');
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('Attempting to register with:', { name, email });
    console.log('SUBMIT HANDLER FIRED!');
    setSuccessMessage('');
    try {
      const result = await dispatch(registerUser({ name, email, password })).unwrap();
      setSuccessMessage(result.message || 'Account created successfully!');
    } catch (rejectedValue) {
      // Error is already set in the Redux state
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container auth-appear">
        <div className="auth-logo">
          <h2 className="logo-wordmark">Electrokart</h2>
        </div>
        <h2>Create Account</h2>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && status === 'failed' && !successMessage && <p className="error-message">{error}</p>}
        
        {/* ✅ Ensure onSubmit is attached to the <form> tag */}
        <form onSubmit={submitHandler} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="auth-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {/* ✅ Ensure the button is type="submit" */}
          <button type="submit" className="btn-submit" disabled={status === 'loading'}>
            {status === 'loading' ? <span className="btn-spinner"></span> : 'Create Account'}
          </button>
        </form>

        <p className="auth-redirect-link">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;