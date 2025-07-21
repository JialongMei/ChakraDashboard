import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DashboardPlugin } from 'dashboard-plugin';
import { toaster } from '../components/ui/toaster';

const useShakeLogout = (enabled = true) => {
    const { logout, isAuthenticated } = useAuth();
    const [isShakeDetectionActive, setIsShakeDetectionActive] = useState(false);
    const [shakeCount, setShakeCount] = useState(0);
    const [pluginStatus, setPluginStatus] = useState('initializing'); // 'initializing', 'ready', 'active', 'error'
    const [pluginError, setPluginError] = useState(null);
    const listenerRef = useRef(null);

    const handleShakeDetected = async (event) => {
        console.log('Shake detected at:', new Date(event.timestamp));
        setShakeCount(prev => prev + 1);
        
        try {
            toaster.create({
                title: "Shake Detected!",
                description: "Logging out due to phone shake...",
                status: "info",
                duration: 2000,
                meta: { closable: true }
            });
            
            console.log('Shake detected - logging out user...');
            
            // Small delay to show the toast
            setTimeout(async () => {
                await logout();
            }, 500);
            
        } catch (error) {
            console.error('Error during shake logout:', error);
            toaster.create({
                title: "Logout Error",
                description: "Failed to logout after shake detection",
                status: "error",
                duration: 3000,
                meta: { closable: true }
            });
        }
    };

    // Test function to manually trigger shake detection
    const testShakeDetection = async () => {
        try {
            setShakeCount(prev => prev + 1);
            toaster.create({
                title: "Manual Test Shake!",
                description: "Testing shake detection manually...",
                status: "success",
                duration: 2000,
                meta: { closable: true }
            });
            
            // Simulate the shake event
            await handleShakeDetected({ timestamp: Date.now() });
        } catch (error) {
            console.error('Error during manual test:', error);
            setPluginError(error.message);
        }
    };

    const startShakeDetection = async () => {
        if (!isAuthenticated || !enabled) return;

        try {
            setPluginStatus('initializing');
            setPluginError(null);
            
            // Test if plugin is available
            const status = await DashboardPlugin.isListening();
            setPluginStatus('ready');
            
            // Enable shake detection
            await DashboardPlugin.enableListening();
            
            // Add shake event listener
            listenerRef.current = await DashboardPlugin.addListener('shake', handleShakeDetected);
            
            setIsShakeDetectionActive(true);
            setPluginStatus('active');
            console.log('Shake detection for logout enabled');
            
            // Show success toast
            toaster.create({
                title: "Plugin Ready!",
                description: "DashboardPlugin initialized successfully",
                status: "success",
                duration: 3000,
                meta: { closable: true }
            });
            
        } catch (error) {
            console.error('Failed to start shake detection:', error);
            setPluginStatus('error');
            setPluginError(error.message);
            
            toaster.create({
                title: "Plugin Error",
                description: `Failed to initialize DashboardPlugin: ${error.message}`,
                status: "error",
                duration: 5000,
                meta: { closable: true }
            });
        }
    };

    const stopShakeDetection = async () => {
        try {
            // Remove listener
            if (listenerRef.current) {
                await listenerRef.current.remove();
                listenerRef.current = null;
            }
            
            // Stop shake detection
            await DashboardPlugin.stopListening();
            
            setIsShakeDetectionActive(false);
            setPluginStatus('ready');
            console.log('Shake detection for logout disabled');
            
        } catch (error) {
            console.error('Failed to stop shake detection:', error);
            setPluginError(error.message);
        }
    };

    useEffect(() => {
        if (isAuthenticated && enabled) {
            startShakeDetection();
        } else {
            stopShakeDetection();
        }

        // Cleanup on unmount
        return () => {
            stopShakeDetection();
        };
    }, [isAuthenticated, enabled]); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        isShakeDetectionActive,
        shakeCount,
        pluginStatus,
        pluginError,
        startShakeDetection,
        stopShakeDetection,
        testShakeDetection
    };
};

export default useShakeLogout; 