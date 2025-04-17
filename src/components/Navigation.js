import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();


    if (!isAuthenticated) {
        return (
            <nav style={{ marginBottom: '20px' }}>
                <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
                <Link to="/signup" style={{ marginRight: '10px' }}>Sign Up</Link>
            </nav>
        );
    }

    return (
        <nav style={{ marginBottom: '20px' }}>
            <Link to="/dashboard" style={{ marginRight: '10px' }}>Dashboard</Link>
            <Link to="/users" style={{ marginRight: '10px' }}>Users</Link>
        </nav>
    );
};

export default Navigation;