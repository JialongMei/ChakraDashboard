import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { auth } from '../firebase';

// Base URL for your API
export const API_BASE_URL = 'http://192.168.178.154:8000/api/';

// API endpoints
const ENDPOINTS = {
    todoLists: 'todo_list/',
    todoItems: 'todo_item/',
    assignedToMe: 'todo_item/assigned_to_me/',
    assignToOther: 'todo_item/assign_task/',
    users: 'user/list_users/',
    currentUser: 'user/user_profile/',
    updateCurrentUser: 'user/update_profile/'
};

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const token = await getAuthToken();
            const response = await fetch(`${API_BASE_URL}${ENDPOINTS.currentUser}`, {
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
    console.log('Fetching:', `${API_BASE_URL}${ENDPOINTS.todoLists}`);
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

const ITEMS_PER_PAGE = 10; // Define page size for infinite scrolling

// Fetch todo items for a specific list with infinite scrolling
export const useTodoItems = (listId) => {
    return useInfiniteQuery({
        queryKey: ['todoItems', listId],
        queryFn: async ({ pageParam = 1 }) => {
            const token = await getAuthToken();
            const response = await fetch(`${API_BASE_URL}${ENDPOINTS.todoLists}${listId}/?page=${pageParam}&limit=${ITEMS_PER_PAGE}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            // Return both items and pagination info
            return {
                items: data.items || [],
                currentPage: pageParam,
                hasNext: data.has_next || false,
                totalPages: data.total_pages || 1,
                totalItems: data.total_items || (data.items ? data.items.length : 0)
            };
        },
        getNextPageParam: (lastPage, allPages) => {
            // Check if backend explicitly says there are more pages
            if (lastPage.hasNext && lastPage.items && lastPage.items.length > 0) {
                return lastPage.currentPage + 1;
            }
            
            // Fallback: if no explicit pagination info, use length check but be more careful
            if (lastPage.items && lastPage.items.length === ITEMS_PER_PAGE) {
                console.log("!!!!!!!!!!!!!!!");
                const nextPageNumber = lastPage.currentPage + 1;
                
                // Additional safety check: don't go beyond reasonable limits
                if (lastPage.totalPages && nextPageNumber > lastPage.totalPages) {
                    return undefined;
                }
                
                // Extra safety: check if we've seen these items before to prevent infinite loops
                const allItemIds = new Set();
                for (const page of allPages) {
                    if (page.items) {
                        for (const item of page.items) {
                            allItemIds.add(item.id);
                        }
                    }
                }
                
                // If we have fewer unique items than expected for the number of pages,
                // we might be getting duplicates, so stop
                const expectedMinItems = (allPages.length - 1) * ITEMS_PER_PAGE;
                if (allItemIds.size < expectedMinItems) {
                    return undefined;
                }
                
                return nextPageNumber;
            }
            
            return undefined; // No more pages
        },
        enabled: !!listId, // Only run a query if listId is provided
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
        onSuccess: (newItemData) => {
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
        onSuccess: (updatedItemData, variables) => {
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
                return null;
            }
            const text = await response.text();
            return text ? JSON.parse(text) : null;
        },
        onSuccess: (data, itemId) => {
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
                let errorMessage = 'Network response was not ok when getting assigned items';
                try {
                    // Attempt to parse a JSON error response from the backend
                    const errorData = await response.json();
                    errorMessage = errorData.detail || errorData.error || errorMessage;
                } catch (e) {
                    // If parsing errorData fails, use the generic message
                }
                throw new Error(errorMessage);
            }

            if (response.status === 204) {
                return []; // Return an empty array as no items are present
            }
            const data = await response.json(); // Parse the JSON response body

            return data && data.results ? data.results : [];
        },
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

// Fetch all users for dropdown selections
export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const token = await getAuthToken();
            const response = await fetch(`${API_BASE_URL}${ENDPOINTS.users}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                let errorMessage = 'Network response was not ok when getting users';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.detail || errorData.error || errorMessage;
                } catch (e) {
                    // If parsing errorData fails, use the generic message
                }
                throw new Error(errorMessage);
            }
            const data = await response.json();
            
            // Return the users array - adjust based on API response structure
            return data && data.results ? data.results : data;
        },
    });
};

// Update current user profile
export const useUpdateCurrentUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (updatedData) => {
            const token = await getAuthToken();
            const response = await fetch(`${API_BASE_URL}${ENDPOINTS.updateCurrentUser}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                let errorMessage = 'Network response was not ok when updating user profile';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.detail || errorData.error || errorMessage;
                } catch (e) {}
                throw new Error(errorMessage);
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        },
    });
};

// --- ADMIN USER CRUD HOOKS ---

// List all users (admin only)
export const useAdminUsers = () => {
    return useQuery({
        queryKey: ['adminUsers'],
        queryFn: async () => {
            const token = await getAuthToken();
            const response = await fetch(`${API_BASE_URL}user/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                let errorMessage = 'Network response was not ok when listing users';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.detail || errorData.error || errorMessage;
                } catch (e) {}
                throw new Error(errorMessage);
            }
            const data = await response.json();
            return data && data.results ? data.results : data;
        },
    });
};

// Get user by ID (admin or self)
export const useAdminUser = (userId) => {
    return useQuery({
        queryKey: ['adminUser', userId],
        queryFn: async () => {
            const token = await getAuthToken();
            const response = await fetch(`${API_BASE_URL}user/${userId}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                let errorMessage = 'Network response was not ok when getting user';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.detail || errorData.error || errorMessage;
                } catch (e) {}
                throw new Error(errorMessage);
            }
            return response.json();
        },
        enabled: !!userId,
    });
};

// Create/register a new user (admin)
export const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newUser) => {
            const token = await getAuthToken();
            const response = await fetch(`${API_BASE_URL}user/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newUser),
            });
            if (!response.ok) {
                let errorMessage = 'Network response was not ok when registering user';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.detail || errorData.error || errorMessage;
                } catch (e) {}
                throw new Error(errorMessage);
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
        },
    });
};

// Update user (admin or self)
export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ userId, updatedData }) => {
            const token = await getAuthToken();
            const response = await fetch(`${API_BASE_URL}user/${userId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                let errorMessage = 'Network response was not ok when updating user';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.detail || errorData.error || errorMessage;
                } catch (e) {}
                throw new Error(errorMessage);
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
        },
    });
};

// Delete user (admin or self)
export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (userId) => {
            const token = await getAuthToken();
            const response = await fetch(`${API_BASE_URL}user/${userId}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                let errorMessage = 'Network response was not ok when deleting user';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.detail || errorData.error || errorMessage;
                } catch (e) {}
                throw new Error(errorMessage);
            }
            if (response.status === 204) {
                return null;
            }
            const text = await response.text();
            return text ? JSON.parse(text) : null;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
        },
    });
};

// Simple test to check if the app has internet connection
export const testInternetConnection = async () => {
    try {
        const response = await fetch('https://www.google.com', { method: 'GET' });
        return response.ok;
    } catch (error) {
        return false;
    }
};

// Test if backend base URL returns a status code (returns status or null on error)
export const testBackendBaseUrl = async () => {
    try {
        const resp = await fetch(API_BASE_URL, { method: 'GET' });
        return resp.status;
    } catch (e) {
        return null;
    }
};

// Test both Google, a CORS-friendly public API, and backend 404
export const testMultipleInternetConnections = async () => {
    let google = false;
    let corsApi = false;
    let backendStatus = null;
    try {
        const googleResp = await fetch('https://www.google.com', { method: 'GET' });
        google = googleResp.ok;
    } catch (e) {
        google = false;
    }
    try {
        const corsResp = await fetch('https://jsonplaceholder.typicode.com/posts/1', { method: 'GET' });
        corsApi = corsResp.ok;
    } catch (e) {
        corsApi = false;
    }
    try {
        const backendResp = await fetch(API_BASE_URL, { method: 'GET' });
        backendStatus = backendResp.status;
    } catch (e) {
        backendStatus = null;
    }
    return { google, corsApi, backendStatus };
};