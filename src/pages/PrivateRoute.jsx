import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = sessionStorage.getItem('accountDTO');
    return isAuthenticated ? children : <Navigate to="/Login" />;
};

export default PrivateRoute;