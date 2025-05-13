import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LayoutWrapper from "./LayoutWrapper";
import { useEffect } from 'react';
import useAuthCheck from "./UseAuthCheck";

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();
    const {isLoading, error} = useAuthCheck();

    useEffect(() => {
        if (error) {
            console.error("Authentication failed:", error);
        }
    }, [error]);

    if (isLoading) {
        return <div>Loading...</div>; // Show a loading indicator while checking auth
    }

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