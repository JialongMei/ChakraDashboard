import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Checkbox,
    createIcon,
    Flex,
    HStack,
    List,
    Spinner,
    Text,
    VStack,
    IconButton,
    Input, NativeSelect
} from "@chakra-ui/react"
import {SearchIcon} from "./List";
import { useNavigate } from "react-router-dom";
import { initialTodoListsData } from "../data/todoData.js";
import { useTodoLists, useCreateTodoList, useUpdateTodoList, useDeleteTodoList } from '../api/todoApi';
import {useAuth} from "../context/AuthContext";
import { Dialog, Field, Input as ChakraInput, Textarea, Portal, CloseButton } from "@chakra-ui/react";
import { API_BASE_URL, testInternetConnection, testMultipleInternetConnections } from '../api/todoApi';

const index = 3;

const TrashCanIcon = createIcon({
    displayName: "TrashCanIcon",
    viewBox: "0 0 60.167 60.167",
    path: (
        <path d="M54.5,11.667H39.88V3.91c0-2.156-1.754-3.91-3.91-3.91H24.196c-2.156,0-3.91,1.754-3.91,3.91v7.756H5.667
	c-0.552,0-1,0.448-1,1s0.448,1,1,1h2.042v40.5c0,3.309,2.691,6,6,6h32.75c3.309,0,6-2.691,6-6v-40.5H54.5c0.552,0,1-0.448,1-1
	S55.052,11.667,54.5,11.667z M22.286,3.91c0-1.053,0.857-1.91,1.91-1.91H35.97c1.053,0,1.91,0.857,1.91,1.91v7.756H22.286V3.91z
	 M50.458,54.167c0,2.206-1.794,4-4,4h-32.75c-2.206,0-4-1.794-4-4v-40.5h40.75V54.167z M38.255,46.153V22.847c0-0.552,0.448-1,1-1
	s1,0.448,1,1v23.306c0,0.552-0.448,1-1,1S38.255,46.706,38.255,46.153z M29.083,46.153V22.847c0-0.552,0.448-1,1-1s1,0.448,1,1
	v23.306c0,0.552-0.448,1-1,1S29.083,46.706,29.083,46.153z M19.911,46.153V22.847c0-0.552,0.448-1,1-1s1,0.448,1,1v23.306
	c0,0.552-0.448,1-1,1S19.911,46.706,19.911,46.153z"/>
    ),
});

const EditIcon = createIcon({
    displayName: "EditIcon",
    viewBox: "0 0 24 24",
    path: (
        <path
            fill="currentColor"
            d="M20.71,7.04C21.1,6.65 21.1,6.02 20.71,5.63L18.37,3.29C17.98,2.9 17.35,2.9 16.96,3.29L15.13,5.12L18.88,8.87M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25Z"
        />
    ),
});

const ENDPOINTS = {
    todoLists: 'todo_list/',
    // ... other endpoints ...
};

const ListCard = ({title, owner, items, id, onEdit, onDelete, ...props}) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [visibleItems, setVisibleItems] = useState(items);
    const navigate = useNavigate();
    
    const isMiniView = windowWidth <= 374;
    const isSmallScreen = windowWidth <= 457;
    const shouldShowIconButtons = windowWidth <= 888;
    const isMobileView = windowWidth < 768;

    // Dynamically adjust visible items based on screen width
    useEffect(() => {
        let itemsToShow;
        if (windowWidth < 500) {
            itemsToShow = items.slice(0, 2);
        } else if (windowWidth < 768) {
            itemsToShow = items.slice(0, 3);
        } else if (windowWidth < 992) {
            itemsToShow = items.slice(0, 4);
        } else if (windowWidth < 1200) {
            itemsToShow = items.slice(0, 5);
        } else {
            itemsToShow = items.slice(0, 6);
        }
        
        setVisibleItems(itemsToShow);
    }, [windowWidth, items]);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Calculate if we have more items to show
    const hasMoreItems = items.length > visibleItems.length;

    // Function to handle navigation to details page
    const handleShowDetails = () => {
        console.log("Navigating to details for ID:", id);
        navigate(`/dashboard/todolist/${id}`);
    };


    return (
        <HStack
            bg="white"
            p={3}
            borderRadius="16px"
            alignItems="center"
            justifyContent="space-between"
            height={{base: "auto", md: "auto"}}
            minHeight={{base: "90px", md: "100px"}}
            spacing={2}
            position="relative"
        >
            <HStack
                alignItems="flex-start"
                flexGrow={1}
                minWidth={0}
                ml={isSmallScreen ? 2 : 4}
                overflow="hidden"
                display={isMiniView ? "none" : "flex"}
                spacing={3}
            >
                <IconButton
                    aria-label="Edit list"
                    size="xs"
                    bg="#A3A1FF"
                    color="white"
                    isRound={true}
                    _hover={{ bg: "#8583F4" }}
                    onClick={onEdit}
                    variant="solid"
                    flexShrink={0}
                >
                    <EditIcon color="white" boxSize={4}/>
                </IconButton>
                <Text
                    fontSize={{base: "xs", sm: "sm", md: "16px"}}
                    fontWeight={500}
                    noOfLines={1}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    color="black"
                    isTruncated
                    mr={4}
                    mt={isMobileView ? 0 : 1}
                >
                    {title}
                </Text>
                <List.Root 
                    flexGrow={1} 
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    gap={2}
                    mt={2}
                    alignItems="flex-start"
                >
                    {visibleItems.map((item, index) => (
                        <List.Item
                            key={index}
                            fontSize={{base: "2xs", sm: "12px"}}
                            fontWeight={400}
                            opacity={0.6}
                            color="gray.950"
                            flex="0 0 auto"
                            minWidth="150px"
                            maxWidth="200px"
                            whiteSpace="nowrap"
                            overflow="hidden"
                            textOverflow="ellipsis"
                            _hover={{
                                overflow: "visible",
                                zIndex: 1,
                                bg: "white",
                                boxShadow: "md",
                                borderRadius: "md",
                            }}
                        >
                            {item}
                        </List.Item>
                    ))}
                    {hasMoreItems && (
                        <List.Item
                            fontSize={{base: "2xs", sm: "12px"}}
                            fontWeight={500}
                            color="blue.500"
                            flex="0 0 auto"
                        >
                            +{items.length - visibleItems.length} more...
                        </List.Item>
                    )}
                </List.Root>
            </HStack>

            {/* Mobile vertical buttons - for smaller screens */}
            {isMobileView && (
                <VStack
                    spacing={2}
                    flexShrink={0}
                    alignItems="center"
                >
                    <Button
                        size="sm"
                        bg="#6F6CF3"
                        color="white"
                        _hover={{bg: "gray.700"}}
                        height={{base: "30px", md: "36px"}}
                        width="36px"
                        minWidth="36px"
                        p={0}
                        onClick={handleShowDetails}
                    >
                        <SearchIcon color="white" boxSize={4}/>
                    </Button>
                    <Button
                        size="sm"
                        bg="gray.700"
                        color="white"
                        _hover={{bg: "#5957d7"}}
                        height={{base: "30px", md: "36px"}}
                        width="36px"
                        minWidth="36px"
                        p={0}
                        onClick={onDelete}
                    >
                        <TrashCanIcon color="white" boxSize={4}/>
                    </Button>
                </VStack>
            )}

            {/* Tablet horizontal icon buttons (at 888px and below, but above mobile) */}
            {(shouldShowIconButtons && !isMobileView) && (
                <HStack
                    spacing={2}
                    flexShrink={0}
                    alignItems="center"
                >
                    <Button
                        size="sm"
                        bg="#6F6CF3"
                        color="white"
                        _hover={{bg: "gray.700"}}
                        height={{base: "30px", md: "36px"}}
                        width="36px"
                        minWidth="36px"
                        p={0}
                        onClick={handleShowDetails}
                    >
                        <SearchIcon color="white" boxSize={4}/>
                    </Button>
                    <Button
                        size="sm"
                        bg="gray.700"
                        color="white"
                        _hover={{bg: "#5957d7"}}
                        height="36px"
                        width="36px"
                        minWidth="36px"
                        p={0}
                        borderRadius="8px"
                        onClick={onDelete}
                    >
                        <TrashCanIcon color="white" boxSize={4}/>
                    </Button>
                </HStack>
            )}

            {/* Desktop text buttons - only for large screens above 888px */}
            {!shouldShowIconButtons && (
                <HStack
                    spacing={2}
                    flexShrink={0}
                    alignItems="center"
                >
                    <Button
                        size="sm"
                        bg="#A3A1FF"
                        color="white"
                        borderRadius="8px"
                        width={{ md: "95px", lg: "101px" }}
                        _hover={{ bg: "#8583F4" }}
                        height={{ md: "36px", lg: "45px" }}
                        fontSize={{ md: "13px" }}
                        px={2}
                        onClick={handleShowDetails}
                    >
                        Show Details
                    </Button>
                    <Button
                        size="sm"
                        bg="gray.500"
                        color="white"
                        borderRadius="8px"
                        _hover={{ bg: "gray.600" }}
                        width={{ md: "75px", lg: "90px" }}
                        height={{ md: "36px", lg: "45px" }}
                        fontSize={{ md: "13px" }}
                        px={2}
                        onClick={onDelete}
                    >
                        Delete
                    </Button>
                </HStack>
            )}
        </HStack>
    );
};

const TodoList = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    // Test fetching all todo lists
    const {
        data: lists,
        isLoading: listsLoading,
        error: listsError
    } = useTodoLists();
    const updateList = useUpdateTodoList();
    const deleteList = useDeleteTodoList();
    const createList = useCreateTodoList();

    // State for Edit List Dialog
    const [editingList, setEditingList] = useState(null);
    const [isListEditDialogOpen, setIsListEditDialogOpen] = useState(false);
    
    // State for Add New List Dialog
    const [isAddListDialogOpen, setIsAddListDialogOpen] = useState(false);
    
    const [newList, setNewList] = useState({
        title: "",
    });

    // Error states for form fields
    const [newListErrors, setNewListErrors] = useState({
        title: ""
    });
    const [editListErrors, setEditListErrors] = useState({
        title: ""
    });

    const [internetStatus, setInternetStatus] = useState({ google: null, corsApi: null, backendStatus: null });

    const hanldeCreateList = async(listData) => {
        try {
            await createList.mutateAsync(listData);
            closeAddListDialog(); // Use the new close function
        } catch (error) {
            setNewListErrors(prev => ({
                ...prev,
                title: error.message || "Error creating list"
            }));
            throw error;
        }
    }

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        setNewListErrors({ title: "" });
        try {
            await hanldeCreateList({ ...newList });
        } catch (error) {}
    };

    // Open/Close functions for Add New List Dialog
    const openAddListDialog = () => {
        // Reset form and errors when opening
        setNewList({
            title: ""
        });
        setNewListErrors({
            title: ""
        });
        setIsAddListDialogOpen(true);
    };

    const closeAddListDialog = () => {
        setIsAddListDialogOpen(false);
        // Clear form data and errors
        setNewList({
            title: ""
        });
        setNewListErrors({
            title: ""
        });
    };

    // Open/Close functions for Edit List Dialog
    const openListEditDialog = (listToEdit) => {
        setEditingList({
            id: listToEdit.id,
            title: listToEdit.title,
            description: listToEdit.description || "",
        });
        // Clear any previous errors
        setEditListErrors({
            title: ""
        });
        setIsListEditDialogOpen(true);
    };

    const closeListEditDialog = () => {
        setIsListEditDialogOpen(false);
        setEditingList(null);
        // Clear errors
        setEditListErrors({
            title: ""
        });
    };

    const handleListInputChange = (e) => {
        const { name, value } = e.target;
        setEditingList(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (editListErrors[name]) {
            setEditListErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    // Dedicated input handler for the Add New List dialog
    const handleNewListInputChange = (e) => {
        const { name, value } = e.target;
        setNewList(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (newListErrors[name]) {
            setNewListErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const handleListEditSubmit = async (e) => {
        e.preventDefault();
        if (!editingList) return;
        
        // Clear previous errors
        setEditListErrors({
            title: ""
        });

        try {
            const { id: listId, ...updatedData } = editingList;
            await updateList.mutateAsync({ listId, updatedData });
            closeListEditDialog();
        } catch (error) {
            // Set error message as placeholder for the title field
            setEditListErrors(prev => ({
                ...prev,
                title: error.message || "Error updating list"
            }));
        }
    };

    useEffect(() => {
        if (listsError) {
            testMultipleInternetConnections().then(result => setInternetStatus(result));
        }
    }, [listsError]);

    if (loading || listsLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (listsError) {
        return (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
                <Text color="red.500" fontSize="xl" mb={4}>
                    Failed to fetch todo lists.<br />
                    <span style={{ fontSize: '0.9em', color: '#555' }}>
                        Tried URL: {API_BASE_URL + ENDPOINTS.todoLists}
                    </span>
                </Text>
                <Text color="gray.600" fontSize="md">
                    Access to Google: {internetStatus.google === null ? 'Checking...' : internetStatus.google ? 'Yes' : 'No'}<br />
                    Access to CORS API: {internetStatus.corsApi === null ? 'Checking...' : internetStatus.corsApi ? 'Yes' : 'No'}<br />
                    {internetStatus.backendStatus === null
                        ? 'Backend base URL: Checking...'
                        : internetStatus.backendStatus === 404
                            ? 'Backend base URL returns 404: Yes'
                            : `Backend base URL status: ${internetStatus.backendStatus}`}
                </Text>
            </Box>
        );
    }

    return (
        <Box>
            {/* Container for Buttons at the bottom */}
            <HStack mb={4} spacing={4}>
                {/* Button for adding new list */}
                <Button
                    colorPalette="blue"
                    width={{base: "auto", sm: "auto", md: "auto", lg: "auto"}}
                    minWidth={{base: "106px", lg: "130px"}}
                    borderRadius="8px"
                    fontSize={{base: "sm", lg: "md"}}
                    onClick={openAddListDialog}
                >
                    Add New List
                </Button>
                {/* Button to navigate to assigned tasks */}
                <Button
                    colorPalette="green"
                    onClick={() => navigate("/dashboard/assigned-to-me")}
                    width={{base: "auto", sm: "auto", md: "auto", lg: "auto"}}
                    minWidth={{base: "106px", lg: "130px"}}
                    mt={{base: 2, sm: 0}}
                    borderRadius="8px"
                    fontSize={{base: "sm", lg: "md"}}
                >
                    My Assigned Tasks
                </Button>
            </HStack>
            <VStack spacing={4} align="stretch">
                {lists && lists.map((todo) => (
                    <ListCard
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        owner={todo.owner}
                        items={todo.items.map(item => item.title)}
                        onEdit={() => openListEditDialog(todo)}
                        onDelete={() => deleteList.mutateAsync(todo.id)}
                    />
                ))}
            </VStack>
            {/* Add New List Dialog */}
            {isAddListDialogOpen && (
                <Dialog.Root
                    open={isAddListDialogOpen}
                    onOpenChange={setIsAddListDialogOpen}
                    placement="center"
                >
                    <Portal>
                        <Dialog.Backdrop/>
                        <Dialog.Positioner>
                            <Dialog.Content as="form" onSubmit={handleCreateSubmit} mx={{base: 4, md: 0}}
                                            width={{base: "90%", md: "md"}}>
                                <Dialog.Header pt={4} px={4} pb={2}>
                                    <Dialog.Title fontSize="lg" fontWeight="semibold">Add New List</Dialog.Title>
                                </Dialog.Header>
                                <Dialog.Body px={4} pb={4}>
                                    <Field.Root name="title" required>
                                        <Field.Label>Title</Field.Label>
                                        <Input
                                            name="title"
                                            value={newList.title}
                                            onChange={handleNewListInputChange}
                                            placeholder={newListErrors.title || "Enter List title"}
                                            borderColor={newListErrors.title ? "red.500" : "inherit"}
                                            _placeholder={{ color: newListErrors.title ? "red.500" : "gray.500" }}
                                        />
                                    </Field.Root>
                                </Dialog.Body>
                                <Box display="flex" justifyContent="flex-end" px={4} pb={4} pt={2}>
                                    <Button colorPalette="blue" mr={3} type="submit">
                                        Save
                                    </Button>
                                    <Dialog.CloseTrigger asChild>
                                        <CloseButton onClick={closeAddListDialog} />
                                    </Dialog.CloseTrigger>
                                </Box>
                            </Dialog.Content>
                        </Dialog.Positioner>
                    </Portal>
                </Dialog.Root>
            )}

            {/* Edit List Dialog */}
            {editingList && (
                <Dialog.Root open={isListEditDialogOpen} onOpenChange={setIsListEditDialogOpen} placement="center">
                    <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                            <Dialog.Content as="form" onSubmit={handleListEditSubmit} mx={{ base: 4, md: 0 }} width={{ base: "90%", md: "md" }}>
                                <Dialog.Header pt={4} px={4} pb={2}>
                                    <Dialog.Title fontSize="lg" fontWeight="semibold">Edit List</Dialog.Title>
                                </Dialog.Header>
                                <Dialog.Body px={4} pb={4}>
                                    <Field.Root name="title" mb={3} required>
                                        <Field.Label>Title</Field.Label>
                                        <ChakraInput
                                            name="title"
                                            value={editingList.title}
                                            onChange={handleListInputChange}
                                            placeholder={editListErrors.title || "Enter list title"}
                                            borderColor={editListErrors.title ? "red.500" : "inherit"}
                                            _placeholder={{ color: editListErrors.title ? "red.500" : "gray.500" }}
                                        />
                                    </Field.Root>
                                </Dialog.Body>
                                <Box display="flex" justifyContent="flex-end" px={4} pb={4} pt={2}>
                                    <Button colorPalette="blue" mr={3} type="submit">
                                        Save Changes
                                    </Button>
                                    <Dialog.CloseTrigger asChild>
                                        <CloseButton onClick={closeListEditDialog} />
                                    </Dialog.CloseTrigger>
                                </Box>
                            </Dialog.Content>
                        </Dialog.Positioner>
                    </Portal>
                </Dialog.Root>
            )}
        </Box>
    );
};

export default TodoList;