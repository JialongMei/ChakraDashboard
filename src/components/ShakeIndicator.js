import React from 'react';
import { Box, Text, Badge, VStack, HStack, Button, Tooltip } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

const getStatusColor = (status) => {
    switch (status) {
        case 'initializing': return 'yellow';
        case 'ready': return 'blue';
        case 'active': return 'green';
        case 'error': return 'red';
        default: return 'gray';
    }
};

const getStatusIcon = (status) => {
    switch (status) {
        case 'initializing': return '⏳';
        case 'ready': return '⚡';
        case 'active': return '📱';
        case 'error': return '❌';
        default: return '🔍';
    }
};

const getStatusText = (status) => {
    switch (status) {
        case 'initializing': return 'Initializing...';
        case 'ready': return 'Plugin Ready';
        case 'active': return 'Shake Detection Active';
        case 'error': return 'Plugin Error';
        default: return 'Unknown Status';
    }
};

const ShakeIndicator = ({ 
    showDetails = false, 
    isShakeDetectionActive = false, 
    shakeCount = 0,
    pluginStatus = 'initializing',
    pluginError = null,
    testShakeDetection = null
}) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) return null;

    if (!showDetails) {
        return (
            <Tooltip label={`Plugin Status: ${getStatusText(pluginStatus)}`}>
                <Badge 
                    colorScheme={getStatusColor(pluginStatus)} 
                    position="fixed" 
                    top="10px" 
                    right="10px" 
                    zIndex={1000}
                    fontSize="xs"
                    cursor="help"
                >
                    {getStatusIcon(pluginStatus)} {getStatusText(pluginStatus)}
                </Badge>
            </Tooltip>
        );
    }

    return (
        <Box 
            position="fixed" 
            top="10px" 
            right="10px" 
            p={4} 
            bg="white" 
            borderRadius="md" 
            boxShadow="lg" 
            zIndex={1000}
            minW="250px"
            maxW="300px"
        >
            <VStack spacing={3} align="start">
                <HStack justify="space-between" w="full">
                    <Text fontSize="sm" fontWeight="bold">
                        DashboardPlugin Status
                    </Text>
                    <Badge colorScheme={getStatusColor(pluginStatus)} fontSize="xs">
                        {getStatusIcon(pluginStatus)} {getStatusText(pluginStatus)}
                    </Badge>
                </HStack>
                
                {pluginStatus === 'active' && (
                    <HStack spacing={2}>
                        <Badge colorScheme="green" size="sm">
                            ✅ Listening for Shakes
                        </Badge>
                    </HStack>
                )}
                
                <Text fontSize="xs" color="gray.600">
                    Shakes detected: <strong>{shakeCount}</strong>
                </Text>
                
                {pluginError && (
                    <Box p={2} bg="red.50" borderRadius="sm" w="full">
                        <Text fontSize="xs" color="red.600" fontWeight="medium">
                            Error: {pluginError}
                        </Text>
                    </Box>
                )}
                
                {pluginStatus === 'active' && (
                    <Text fontSize="xs" color="gray.500">
                        💡 Shake phone 3 times to logout
                    </Text>
                )}
                
                {testShakeDetection && pluginStatus === 'active' && (
                    <Button 
                        size="sm" 
                        colorScheme="blue" 
                        variant="outline"
                        onClick={testShakeDetection}
                        w="full"
                        leftIcon={<span>🧪</span>}
                    >
                        Test Shake Detection
                    </Button>
                )}
                
                {pluginStatus === 'error' && (
                    <Text fontSize="xs" color="orange.600" fontStyle="italic">
                        Try refreshing the app or check console for details
                    </Text>
                )}
            </VStack>
        </Box>
    );
};

export default ShakeIndicator; 