import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { auth } from '../firebase';

// Base URL for your API
const API_BASE_URL = 'http://127.0.0.1:8000/api/';

// API endpoints
const ENDPOINTS = {
    todoLists: 'todo_list/',
    todoItems: 'todo_item/',
    assignedToMe: 'todo_item/assigned_to_me/',
    assignToOther: 'todo_item/assign_task/',
};

// Helper function to get auth token
const getAuthToken = async () => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User not authenticated');
    }
    return user.getIdToken();
};

// Fetch all todo lists
export const useTodoLists = () => {
    return useQuery({
        queryKey: ['todoLists'],
        queryFn: async () => {
            const token = await getAuthToken();
            const response = await fetch(`${API_BASE_URL}${ENDPOINTS.todoLists}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
    });
};

// Fetch a single todo list by ID
export const useTodoList = (listId) => {
    return useQuery({
        queryKey: ['todoList', listId],
        queryFn: async () => {
            const token = await getAuthToken();
            const response = await fetch(`${API_BASE_URL}${ENDPOINTS.todoLists}/${listId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
        enabled: !!listId,
    });
};

// Fetch todo items for a specific list
export const useTodoItems = (listId) => {
    return useQuery({
        queryKey: ['todoItems', listId],
        queryFn: async () => {
            const token = await getAuthToken();
            const response = await fetch(`${API_BASE_URL}${ENDPOINTS.todoLists}${listId}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
        enabled: !!listId,
    });
};

// Create a new todo list
export const useCreateTodoList = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (newList) => {
            const token = await getAuthToken();
            const response = await fetch(`${API_BASE_URL}${ENDPOINTS.todoLists}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newList),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todoLists'] });
        },
    });
};

// Create a new todo item
export const useCreateTodoItem = (listId) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (newItem) => {
            const token = await getAuthToken();
            const response = await fetch(`${API_BASE_URL}${ENDPOINTS.todoItems}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newItem),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todoItems', listId] });
        },
    });
};

// Update a todo item
export const useUpdateTodoItem = (listId) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ itemId, updatedData }) => {
            const token = await getAuthToken();
            const response = await fetch(`${API_BASE_URL}${ENDPOINTS.todoItems}${itemId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todoItems', listId] });
        },
    });
};

// Delete a todo item
export const useDeleteTodoItem = (listId) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (itemId) => {
            const token = await getAuthToken();
            const response = await fetch(`${API_BASE_URL}${ENDPOINTS.todoItems}${itemId}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if (response.status === 204) {
                // Deletion successful
                return;
            }
            const text = await response.text();
            return text ? JSON.parse(text) : null;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todoItems', listId] });
        },
    });
};

// Update a todo list
export const useUpdateTodoList = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ listId, updatedData }) => {
            const token = await getAuthToken();
            const response = await fetch(`${API_BASE_URL}${ENDPOINTS.todoLists}${listId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok when updating todo list');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todoLists'] });
        },
    });
};

// Delete a todo list
export const useDeleteTodoList = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (listId) => {
            const token = await getAuthToken();
            const response = await fetch(`${API_BASE_URL}${ENDPOINTS.todoLists}${listId}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok when deleting todo list');
            }
            if (response.status === 204) { // No Content
                return null;
            }
            const text = await response.text();
            return text ? JSON.parse(text) : null;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todoLists'] });
        },
    });
};

// Items assigned to the current user
export const useAssignedToMe = () => {
    return useQuery({
        queryKey: ['assignedToMe'],
        queryFn: async () => {
            const token = await getAuthToken();
            const response = await fetch(`${API_BASE_URL}${ENDPOINTS.assignedToMe}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok when getting assigned items');
            }
            if (response.status === 204) { // No Content
                return null;
            }
            const text = await response.text();
            return text ? JSON.parse(text) : []; // Return empty array for no content or actual data
        },
        // Add other useQuery options as needed, e.g., staleTime, cacheTime
    });
};

// Change an item's assignee ID to assign an item to another user
export const useAssignToOther = (listId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ itemId, newAssigneeId }) => {
            const token = await getAuthToken();
            const response = await fetch(`${API_BASE_URL}${ENDPOINTS.assignToOther}${itemId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ assignee_id: newAssigneeId })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok when assigning item to another user');
            }
            if (response.status === 204) { // No Content
                return null;
            }
            const text = await response.text();
            return text ? JSON.parse(text) : null;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['todoItems', listId] });
            queryClient.invalidateQueries({ queryKey: ['assignedToMe'] });
        }
    });
};