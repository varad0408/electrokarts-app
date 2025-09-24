import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export default function PrivateRoute({ children, adminOnly = false }) {
  const auth = useSelector(state => state.auth);

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && (!auth.user || !auth.user.isAdmin)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  adminOnly: PropTypes.bool,
};