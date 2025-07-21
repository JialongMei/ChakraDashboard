import React from 'react';
import { 
    Box, 
    VStack, 
    HStack, 
    Text, 
    Button, 
    Badge, 
    Card, 
    CardBody,
    CardHeader,
    Heading
} from '@chakra-ui/react';
import useShakeLogout from '../hooks/useShakeLogout';
import LayoutWrapper from '../components/LayoutWrapper';

const PluginTest = () => {
    const { 
        isShakeDetectionActive, 
        shakeCount, 
        pluginStatus, 
        pluginError, 
        startShakeDetection,
        stopShakeDetection,
        testShakeDetection 
    } = useShakeLogout(false); // Don't auto-start for testing

    const getStatusColor = (status) => {
        switch (status) {
            case 'initializing': return 'yellow';
            case 'ready': return 'blue';
            case 'active': return 'green';
            case 'error': return 'red';
            default: return 'gray';
        }
    };

    return (
        <LayoutWrapper pageTitle="Plugin Test">
            <Box p={6} maxW="800px" mx="auto">
                <VStack spacing={6} align="stretch">
                    <Card>
                        <CardHeader>
                            <Heading size="md">📱 DashboardPlugin Test Console</Heading>
                        </CardHeader>
                        <CardBody>
                            <VStack spacing={4} align="stretch">
                                <HStack justify="space-between">
                                    <Text fontWeight="medium">Plugin Status:</Text>
                                    <Badge colorScheme={getStatusColor(pluginStatus)} fontSize="sm">
                                        {pluginStatus.toUpperCase()}
                                    </Badge>
                                </HStack>

                                <HStack justify="space-between">
                                    <Text fontWeight="medium">Shake Detection:</Text>
                                    <Badge colorScheme={isShakeDetectionActive ? 'green' : 'gray'} fontSize="sm">
                                        {isShakeDetectionActive ? 'ACTIVE' : 'INACTIVE'}
                                    </Badge>
                                </HStack>

                                <HStack justify="space-between">
                                    <Text fontWeight="medium">Shakes Detected:</Text>
                                    <Badge colorScheme="blue" fontSize="sm">
                                        {shakeCount}
                                    </Badge>
                                </HStack>

                                {pluginError && (
                                    <Box p={3} bg="red.50" borderRadius="md" border="1px solid" borderColor="red.200">
                                        <Text color="red.600" fontSize="sm" fontWeight="medium">
                                            Error: {pluginError}
                                        </Text>
                                    </Box>
                                )}
                            </VStack>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Heading size="md">🧪 Test Controls</Heading>
                        </CardHeader>
                        <CardBody>
                            <VStack spacing={4}>
                                <HStack spacing={4} w="full">
                                    <Button 
                                        colorScheme="green" 
                                        onClick={startShakeDetection}
                                        isDisabled={isShakeDetectionActive}
                                        flex={1}
                                    >
                                        Start Detection
                                    </Button>
                                    <Button 
                                        colorScheme="red" 
                                        onClick={stopShakeDetection}
                                        isDisabled={!isShakeDetectionActive}
                                        flex={1}
                                    >
                                        Stop Detection
                                    </Button>
                                </HStack>

                                <Box h="1px" bg="gray.200" w="full" />

                                <Button 
                                    colorScheme="blue" 
                                    onClick={testShakeDetection}
                                    isDisabled={!isShakeDetectionActive}
                                    size="lg"
                                    w="full"
                                    leftIcon={<span>🧪</span>}
                                >
                                    Test Shake Detection (Manual Trigger)
                                </Button>

                                <Text fontSize="sm" color="gray.600" textAlign="center">
                                    💡 Or shake your device 3 times to trigger detection
                                </Text>
                            </VStack>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Heading size="md">ℹ️ Plugin Information</Heading>
                        </CardHeader>
                        <CardBody>
                            <VStack spacing={3} align="start">
                                <Text fontSize="sm">
                                    <strong>Plugin:</strong> DashboardPlugin v0.0.1
                                </Text>
                                <Text fontSize="sm">
                                    <strong>Platform:</strong> {navigator.platform}
                                </Text>
                                <Text fontSize="sm">
                                    <strong>User Agent:</strong> {navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'}
                                </Text>
                                <Text fontSize="sm" color="blue.600">
                                    <strong>Note:</strong> This plugin works best on physical Android/iOS devices. 
                                    Web platform shows limited functionality.
                                </Text>
                            </VStack>
                        </CardBody>
                    </Card>
                </VStack>
            </Box>
        </LayoutWrapper>
    );
};

export default PluginTest; 