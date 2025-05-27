import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Checkbox,
    Heading,
    HStack,
    IconButton,
    Spinner,
    Text,
    VStack,
    Badge,
    // 필요한 다른 Chakra UI 컴포넌트들을 여기에 추가하세요.
    // Add other necessary Chakra UI components here.
} from '@chakra-ui/react';
import { useAssignedToMe } from '../api/todoApi'; // Removed unused useDeleteTodoItem, useUpdateTodoItem
// import { useAuth } from '../context/AuthContext'; // 필요하다면 주석 해제

// TodoDetails.js에서 TodoItemCard와 유사한 컴포넌트지만, 이 페이지에 맞게 조정될 수 있습니다.
// Similar to TodoItemCard from TodoDetails.js, but can be adjusted for this page.

// Back arrow icon
const BackArrowIcon = () => (
    <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m10.978 14.999v3.251c0 .412-.335.75-.752.75-.188 0-.375-.071-.518-.206-1.775-1.685-4.945-4.692-6.396-6.069-.2-.189-.312-.452-.312-.725 0-.274.112-.536.312-.725 1.451-1.377 4.621-4.385 6.396-6.068.143-.136.33-.207.518-.207.417 0 .752.337.752.75v3.251h9.02c.531 0 1.002.47 1.002 1v3.998c0 .53-.471 1-1.002 1z" fill-rule="nonzero"/></svg>);



const AssignedTaskItemCard = ({ item, onEdit, onDelete }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const isMobileView = windowWidth < 768;

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "PENDING": return "yellow";
            case "IN_PROGRESS": return "blue";
            case "DONE": return "green";
            default: return "gray";
        }
    };

    return (
        <HStack
            bg="white"
            p={3}
            borderRadius="16px"
            alignItems="flex-start"
            justifyContent="space-between"
            width="100%"
            flexWrap={{ base: "wrap", md: "nowrap" }}
            spacing={4}
            shadow="sm"
        >
            <HStack spacing={3} flex="1" alignItems="center">
                <Checkbox.Root 
                    defaultIsChecked={item.status === 'DONE'} 
                    isDisabled 
                    display="flex" 
                    alignItems="center"
                >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                </Checkbox.Root>
                <VStack align="flex-start" spacing={1} flex="1">
                    <HStack width="100%" justifyContent="space-between" alignItems="center">
                        <Text
                            fontSize={{ base: "sm", md: "md" }}
                            fontWeight={600}
                            color="black"
                            noOfLines={1}
                        >
                            {item.title}
                        </Text>
                        <Badge
                            colorScheme={getStatusColor(item.status)}
                            px={2} py={1} borderRadius="md" fontSize="xs"
                        >
                            {item.status ? item.status.replace("_", " ") : 'NO STATUS'}
                        </Badge>
                    </HStack>
                    <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600" noOfLines={isMobileView ? 2 : 3}>
                        {item.description || "No description."}
                    </Text>
                    <HStack width="100%" justifyContent="space-between" alignItems="center" mt={1}>
                         <Text fontSize="xs" color="gray.500">
                            Created: {formatDate(item.created_at)}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                            Updated: {formatDate(item.last_modified)}
                        </Text>
                    </HStack>
                </VStack>
            </HStack>
            {/* No Edit/Delete buttons for assigned tasks view, or implement if needed */}
        </HStack>
    );
};

const AssignedTasksPage = () => {
    const navigate = useNavigate();
    // const { user } = useAuth(); // Uncomment if user context is needed directly

    const {
        data: assignedTasksData, // Renamed to avoid conflict if you destructure items directly
        isLoading,
        error,
        // refetch, // If you need manual refetching
    } = useAssignedToMe(); // Fetches tasks assigned to the current user

    // The actual list of tasks might be nested, e.g., assignedTasksData.items or just assignedTasksData
    // Adjust this based on the actual structure of the data returned by useAssignedToMe
    const tasks = Array.isArray(assignedTasksData) ? assignedTasksData : (assignedTasksData?.items || []);


    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" py={10}>
                <Text color="red.500">Error fetching assigned tasks: {error.message}</Text>
                <Button mt={4} onClick={() => navigate(-1)}>Go Back</Button>
            </Box>
        );
    }
    
    return (
        <Box p={{ base: 2, md: 4 }} maxW="100%" mx="auto">
            <VStack spacing={{ base: 3, md: 4 }} align="stretch" maxW="1200px" mx="auto">
                <HStack spacing={4} alignItems="center" mb={4}>
                    <IconButton
                        onClick={() => navigate(-1)} // Or a specific path like "/dashboard/todolist"
                        aria-label="Go back"
                        size="md"
                        borderRadius="full"
                        color="black"
                        bg="#f8f4fc"
                    >
                        {<BackArrowIcon />}
                    </IconButton>
                    <Heading size={{ base: "md", md: "lg" }} as="h1" fontWeight={600} color="black">
                        My Assigned Tasks
                    </Heading>
                </HStack>

                {tasks.length === 0 ? (
                    <Box textAlign="center" py={10} bg="white" borderRadius="lg" shadow="sm" p={5}>
                        <Text fontSize="lg" color="gray.700">You have no tasks assigned to you.</Text>
                    </Box>
                ) : (
                    tasks.map(item => (
                        <AssignedTaskItemCard key={item.id} item={item} />
                        // onDelete and onEdit are removed as this is a view-only list for now
                        // If edit/delete functionality is needed here, pass appropriate handlers
                    ))
                )}
            </VStack>
        </Box>
    );
};

export default AssignedTasksPage; 