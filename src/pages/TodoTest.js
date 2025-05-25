import React from 'react';
import { Box, Button, Text, VStack, Heading, Spinner } from '@chakra-ui/react';
import { useTodoLists, useCreateTodoList, useTodoItems } from '../api/todoApi';
import { useAuth } from '../context/AuthContext';

const TodoTest = () => {
    const { user, loading } = useAuth();

    // Test fetching all todo lists
    const {
        data: lists,
        isLoading: listsLoading,
        error: listsError
    } = useTodoLists();

    // Test creating a new todo list
    const createList = useCreateTodoList();

    // Test fetching items for the first list (if any exist)
    const {
        data: items,
        isLoading: itemsLoading,
        error: itemsError
    } = useTodoItems(8);

    const handleCreateList = async () => {
        try {
            const newList = {
                title: "Test List " + new Date().toLocaleTimeString(),
                description: "This is a test list"
            };
            await createList.mutateAsync(newList);
        } catch (error) {
            console.error('Error creating list:', error);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (!user) {
        return (
            <Box p={4}>
                <Text color="red.500">Please log in to access todo lists</Text>
            </Box>
        );
    }

    return (
        <Box p={4}>
            <VStack spacing={4} align="stretch">
                <Heading size="md" color="black">API Test Component</Heading>
                <Text color="green">Logged in as: {user.email}</Text>

                {/* Test Fetching Lists */}
                <Box p={4} borderWidth={1} borderRadius="md">
                    <Heading size="sm" mb={2} color="black">Todo Lists</Heading>
                    {listsLoading && <Text color="black">Loading lists...</Text>}
                    {listsError && <Text color="red.500">Error: {listsError.message}</Text>}
                    {lists && (
                        <VStack align="stretch" spacing={2}>
                            {lists.map(list => (
                                <Box key={list.id} p={2} borderWidth={1} borderRadius="md">
                                    <Text color="black" fontWeight="bold">{list.title}</Text>
                                    <Text color="black" >{list.description}</Text>
                                </Box>
                            ))}
                        </VStack>
                    )}
                </Box>

                {/* Test Creating List */}
                <Box p={4} borderWidth={1} borderRadius="md">
                    <Heading size="sm" mb={2} color="black">Create New List</Heading>
                    <Button
                        onClick={handleCreateList}
                        isLoading={createList.isPending}
                        colorScheme="blue"
                    >
                        Create Test List
                    </Button>
                </Box>

                {/* Test Fetching Items */}
                {/* Test Fetching Items */}
                {lists && lists.length > 0 && (
                    <Box p={4} borderWidth={1} borderRadius="md">
                        <Heading size="sm" mb={2} color="black">Todo Items (First List)</Heading>
                        {itemsLoading && <Text color="black">Loading items...</Text>}
                        {itemsError && <Text color="red.500">Error: {itemsError.message}</Text>}
                        {items && items.items && Array.isArray(items.items) && (
                            <VStack align="stretch" spacing={2}>
                                {items.items.map((item, index) => (
                                    <Box key={item.id} p={2} borderWidth={1} borderRadius="md">
                                        <Text color="black" fontWeight="bold">{item.title}</Text>
                                        <Text color="black">{item.description}</Text>
                                        <Text color="black">Status: {item.status}</Text>
                                    </Box>
                                ))}
                            </VStack>
                        )}
                    </Box>
                )}
            </VStack>
        </Box>
    );
};

export default TodoTest; 