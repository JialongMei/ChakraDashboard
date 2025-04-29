import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LayoutWrapper from "./LayoutWrapper";

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <LayoutWrapper pageTitle="Dashboard">
            <Outlet />
        </LayoutWrapper>
    )
};

export default PrivateRoute;