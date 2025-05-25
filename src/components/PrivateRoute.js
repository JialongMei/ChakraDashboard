import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LayoutWrapper from "./LayoutWrapper";
import { Box, Spinner, Text } from '@chakra-ui/react';

const PrivateRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <LayoutWrapper pageTitle="Dashboard">
            <Outlet />
        </LayoutWrapper>
    );
};

export default PrivateRoute;