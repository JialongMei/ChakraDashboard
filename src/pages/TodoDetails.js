import React, {useEffect, useState, useMemo, useCallback, useRef} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    Badge,
    Box,
    Button,
    Checkbox,
    CloseButton,
    Dialog,
    Field,
    Heading,
    HStack,
    IconButton,
    Input,
    Portal,
    Select,
    Text,
    Textarea,
    VStack,
    NativeSelect,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import {useCreateTodoItem, useTodoItems, useDeleteTodoItem, useUpdateTodoItem, useUsers} from "../api/todoApi";
import {useAuth} from "../context/AuthContext";

// Back arrow icon
const BackArrowIcon = () => (
    <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m10.978 14.999v3.251c0 .412-.335.75-.752.75-.188 0-.375-.071-.518-.206-1.775-1.685-4.945-4.692-6.396-6.069-.2-.189-.312-.452-.312-.725 0-.274.112-.536.312-.725 1.451-1.377 4.621-4.385 6.396-6.068.143-.136.33-.207.518-.207.417 0 .752.337.752.75v3.251h9.02c.531 0 1.002.47 1.002 1v3.998c0 .53-.471 1-1.002 1z" fill-rule="nonzero"/></svg>);

const TodoItemCard = React.forwardRef(({item, onEdit, onDelete, onOpenAssignDialog}, ref) => {
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
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'});
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "PENDING":
                return "yellow";
            case "IN_PROGRESS":
                return "blue";
            case "DONE":
                return "green";
            default:
                return "gray";
        }
    };

    return (
        <HStack
            ref={ref}
            bg="white"
            p={3}
            borderRadius="16px"
            alignItems="flex-start"
            justifyContent="space-between"
            width="100%"
            flexWrap={{base: "wrap", md: "nowrap"}}
            spacing={4}
        >
            <HStack spacing={3} flex="1" alignItems="center">
                <Checkbox.Root display="flex" alignItems="center">
                    <Checkbox.HiddenInput/>
                    <Checkbox.Control/>
                </Checkbox.Root>

                <VStack align="flex-start" spacing={2} ml={2} mt={4} flex="1">
                    <HStack width="100%" justifyContent="space-between" alignItems="center">
                        <Text
                            fontSize={{base: "sm", md: "md", lg: "lg"}}
                            fontWeight={600}
                            noOfLines={1}
                            overflow="hidden"
                            textOverflow="ellipsis"
                            color="black"
                        >
                            {item.title}
                        </Text>
                        <Badge
                            colorScheme={getStatusColor(item.status)}
                            px={2}
                            py={1}
                            borderRadius="md"
                            fontSize="xs"
                        >
                            {item.status.replace("_", " ")}
                        </Badge>
                    </HStack>

                    <Text
                        fontSize={{base: "xs", md: "sm"}}
                        color="gray.600"
                        noOfLines={isMobileView ? 2 : 3}
                    >
                        {item.description}
                    </Text>

                    <HStack width="100%" justifyContent="space-between" alignItems="center" mt={1}>
                        <HStack spacing={2}>
                            <Text fontSize="xs" color="gray.700">
                                {item.assignee ? item.assignee.name : "Unassigned"}
                            </Text>
                        </HStack>
                        <Text fontSize="xs" color="gray.500">
                            {formatDate(item.last_modified)}
                        </Text>
                    </HStack>
                </VStack>
            </HStack>

            {!isMobileView && (
                <VStack spacing={2} alignItems="center" mt={2}>
                    <Menu.Root>
                        <Menu.Trigger asChild>
                            <Button
                                size="sm"
                                bg="#A3A1FF"
                                color="white"
                                borderRadius="8px"
                                _hover={{bg: "#8583F4"}}
                                height="36px"
                                fontSize="xs"
                                px={3}
                            >
                                Edit Actions
                            </Button>
                        </Menu.Trigger>
                        <Portal>
                            <Menu.Positioner>
                                <Menu.Content>
                                    <Menu.Item value="editDetails" onClick={onEdit}>Edit Task Details</Menu.Item>
                                    <Menu.Item value="assignToOther" onClick={() => onOpenAssignDialog(item)}>Assign to Other</Menu.Item>
                                </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                    <Button
                        mt={2}
                        size="sm"
                        bg="gray.500"
                        color="white"
                        borderRadius="8px"
                        _hover={{bg: "gray.600"}}
                        height="36px"
                        fontSize="xs"
                        px={3}
                        onClick={onDelete}
                    >
                        Delete
                    </Button>
                </VStack>
            )}

            {isMobileView && (
                <HStack spacing={2} width="100%" mt={2} justifyContent="flex-end">
                    <Menu.Root>
                        <Menu.Trigger asChild>
                            <Button
                                size="sm"
                                bg="#A3A1FF"
                                color="white"
                                borderRadius="8px"
                                _hover={{bg: "#8583F4"}}
                                height="30px"
                                fontSize="xs"
                                px={3}
                            >
                                Edit Actions
                            </Button>
                        </Menu.Trigger>
                        <Portal>
                            <Menu.Positioner>
                                <Menu.Content>
                                    <Menu.Item value="editDetails" onClick={onEdit}>Edit Task Details</Menu.Item>
                                    <Menu.Item value="assignToOther" onClick={() => onOpenAssignDialog(item)}>Assign to Other</Menu.Item>
                                </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                    <Button
                        size="sm"
                        bg="gray.500"
                        color="white"
                        borderRadius="8px"
                        _hover={{bg: "gray.600"}}
                        height="30px"
                        fontSize="xs"
                        px={3}
                        onClick={onDelete}
                    >
                        Delete
                    </Button>
                </HStack>
            )}
        </HStack>
    );
});

const TodoDetails = message => {
    const {id: listId} = useParams();
    const navigate = useNavigate();
    const [listTitle, setListTitle] = useState("");
    const [filterStatus, setFilterStatus] = useState("ALL");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
    // State for "Add New Task" Dialog
    const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);

    // State and handlers for "Edit Task" Dialog
    const [editTask, setEditTask] = useState(null); // Holds the item being edited
    const [isEditOpen, setIsEditOpen] = useState(false); // Controls edit dialog visibility

    // State for "Assign to Other" Dialog
    const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
    const [taskToAssign, setTaskToAssign] = useState(null);
    const [newAssigneeId, setNewAssigneeId] = useState("");

    // Error states for form fields
    const [newTaskErrors, setNewTaskErrors] = useState({
        title: "",
        description: "",
        status: "",
        assignee: ""
    });
    const [editTaskErrors, setEditTaskErrors] = useState({
        title: "",
        description: "",
        status: "",
        assignee: ""
    });
    const [assignError, setAssignError] = useState("");

    const {
        data,
        error: itemsError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: itemsLoading,
        isError: isItemsError
    } = useTodoItems(listId);

    // Fetch users for dropdown selections
    const {
        data: users,
        isLoading: usersLoading,
        error: usersError
    } = useUsers();

    // New task form state
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        status: "PENDING",
        assignee: "",
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const allTodoItems = useMemo(() => {
        return data?.pages.reduce((acc, page) => {
            // Handle new data structure where page is an object with items property
            const pageItems = page?.items || page || [];
            return [...acc, ...pageItems]; 
        }, []) || [];
    }, [data]);

    const filteredItems = filterStatus === "ALL"
        ? allTodoItems
        : allTodoItems.filter(item => item.status === filterStatus);

    // Filter buttons data
    const filterButtons = [
        {label: "All", value: "ALL"},
        {label: "Pending", value: "PENDING"},
        {label: "In Progress", value: "IN_PROGRESS"},
        {label: "Done", value: "DONE"}
    ];

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewTask(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (newTaskErrors[name]) {
            setNewTaskErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Clear previous errors
        setNewTaskErrors({
            title: "",
            description: "",
            status: "",
            assignee: ""
        });

        // Client-side validation
        let hasErrors = false;
        const errors = {
            title: "",
            description: "",
            status: "",
            assignee: ""
        };

        if (!newTask.title || newTask.title.trim() === "") {
            errors.title = "Title is required";
            hasErrors = true;
        }

        if (!newTask.description || newTask.description.trim() === "") {
            errors.description = "Description is required";
            hasErrors = true;
        }

        if (!newTask.status) {
            errors.status = "Status is required";
            hasErrors = true;
        }

        if (hasErrors) {
            setNewTaskErrors(errors);
            return;
        }

        try {
            await hanldeCreateItem({
                ...newTask,
                todo_list: listId,
            });
            closeAddTaskDialog();
        } catch (error) {
            // Parse error message to determine which field has the error
            const errorMessage = error.message || "Error creating task";
            const lowerErrorMessage = errorMessage.toLowerCase();
            
            if (lowerErrorMessage.includes('title')) {
                setNewTaskErrors(prev => ({
                    ...prev,
                    title: errorMessage
                }));
            } else if (lowerErrorMessage.includes('description')) {
                setNewTaskErrors(prev => ({
                    ...prev,
                    description: errorMessage
                }));
            } else if (lowerErrorMessage.includes('status')) {
                setNewTaskErrors(prev => ({
                    ...prev,
                    status: errorMessage
                }));
            } else if (lowerErrorMessage.includes('assignee')) {
                setNewTaskErrors(prev => ({
                    ...prev,
                    assignee: errorMessage
                }));
            } else {
                // If we can't determine the specific field, show error on title as fallback
                setNewTaskErrors(prev => ({
                    ...prev,
                    title: errorMessage
                }));
            }
        }
    };

    const createItem = useCreateTodoItem(listId);
    const updateItem = useUpdateTodoItem(listId);
    const deleteItem = useDeleteTodoItem(listId);

    const hanldeCreateItem = async(newItem) => {
        try {
            await createItem.mutateAsync(newItem);
        } catch (error) {
            throw error; // Re-throw to be handled by handleSubmit
        }
    }

    // Open/Close functions for Add New Task Dialog
    const openAddTaskDialog = () => {
        setNewTask({
            title: "",
            description: "",
            status: "PENDING",
            assignee: "",
        });
        setNewTaskErrors({
            title: "",
            description: "",
            status: "",
            assignee: ""
        });
        setIsAddTaskDialogOpen(true);
    };

    const closeAddTaskDialog = () => {
        setIsAddTaskDialogOpen(false);
        setNewTask({
            title: "",
            description: "",
            status: "PENDING",
            assignee: "",
        });
        setNewTaskErrors({
            title: "",
            description: "",
            status: "",
            assignee: ""
        });
    };

    // Open/Close functions for Edit Task Dialog
    const openEditDialog = (itemToEdit) => {
        setEditTask({
            ...itemToEdit,
            assignee: itemToEdit.assignee ? (itemToEdit.assignee.id || itemToEdit.assignee) : "",
        });
        // Clear any previous errors
        setEditTaskErrors({
            title: "",
            description: "",
            status: "",
            assignee: ""
        });
        setIsEditOpen(true);
    };

    const closeEditDialog = () => {
        setIsEditOpen(false);
        setEditTask(null); // Clear the edit task data
        // Clear errors
        setEditTaskErrors({
            title: "",
            description: "",
            status: "",
            assignee: ""
        });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditTask(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (editTaskErrors[name]) {
            setEditTaskErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editTask || !editTask.id) return; // Safety check

        // Clear previous errors
        setEditTaskErrors({
            title: "",
            description: "",
            status: "",
            assignee: ""
        });

        // Client-side validation
        let hasErrors = false;
        const errors = {
            title: "",
            description: "",
            status: "",
            assignee: ""
        };

        if (!editTask.title || editTask.title.trim() === "") {
            errors.title = "Title is required";
            hasErrors = true;
        }

        if (!editTask.description || editTask.description.trim() === "") {
            errors.description = "Description is required";
            hasErrors = true;
        }

        if (!editTask.status) {
            errors.status = "Status is required";
            hasErrors = true;
        }

        if (hasErrors) {
            setEditTaskErrors(errors);
            return;
        }

        try {
            // eslint-disable-next-line no-unused-vars
            const { id: itemId, todo_list, created_at, last_modified, ...dataToUpdate } = editTask;
            await updateItem.mutateAsync({ itemId, updatedData: dataToUpdate });
            closeEditDialog();
        } catch (error) {
            // Parse error message to determine which field has the error
            const errorMessage = error.message || "Error updating task";
            const lowerErrorMessage = errorMessage.toLowerCase();
            
            if (lowerErrorMessage.includes('title')) {
                setEditTaskErrors(prev => ({
                    ...prev,
                    title: errorMessage
                }));
            } else if (lowerErrorMessage.includes('description')) {
                setEditTaskErrors(prev => ({
                    ...prev,
                    description: errorMessage
                }));
            } else if (lowerErrorMessage.includes('status')) {
                setEditTaskErrors(prev => ({
                    ...prev,
                    status: errorMessage
                }));
            } else if (lowerErrorMessage.includes('assignee')) {
                setEditTaskErrors(prev => ({
                    ...prev,
                    assignee: errorMessage
                }));
            } else {
                // If we can't determine the specific field, show error on title as fallback
                setEditTaskErrors(prev => ({
                    ...prev,
                    title: errorMessage
                }));
            }
        }
    };

    // Open/Close functions for Assign to Other Dialog
    const openAssignDialog = (itemToAssign) => {
        setTaskToAssign(itemToAssign);
        setNewAssigneeId(""); // Reset assignee ID input
        setAssignError(""); // Clear any previous errors
        setIsAssignDialogOpen(true);
    };

    const closeAssignDialog = () => {
        setIsAssignDialogOpen(false);
        setTaskToAssign(null);
        setNewAssigneeId("");
        setAssignError(""); // Clear errors
    };

    const handleAssignSubmit = async (e) => {
        e.preventDefault();
        setAssignError("");
        if (!taskToAssign || !newAssigneeId.trim()) {
            setAssignError("Please select a task and enter an assignee ID.");
            return;
        }
        try {
            await updateItem.mutateAsync({
                itemId: taskToAssign.id,
                updatedData: { assignee: newAssigneeId.trim() }
            });
            closeAssignDialog();
        } catch (error) {
            setAssignError(error.message || "Error assigning task");
        }
    };

    // Intersection Observer for infinite scrolling
    const observer = useRef();
    const lastItemRef = useCallback(node => {
        if (itemsLoading) return; // Don't run if initial data is loading
        if (observer.current) observer.current.disconnect(); // Disconnect previous observer
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        });
        
        if (node) observer.current.observe(node); // Observe the new node
    }, [itemsLoading, hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (itemsLoading) { // Initial loading state
        return <Box p={5} textAlign="center"><Text>Loading tasks...</Text></Box>;
    }

    if (isItemsError) { // Error state
        return <Box p={5} textAlign="center"><Text>Error loading tasks: {itemsError?.message}</Text></Box>;
    }

    return (
        <Box p={{base: 2, md: 4}} maxW="100%" mx="auto">
            <VStack spacing={{base: 3, md: 4}} align="stretch" maxW="1600px" mx="auto">
                {/* Header */}
                <HStack spacing={4} alignItems="center">
                    <IconButton
                        onClick={() => navigate("/dashboard/todolist")}
                        aria-label="Go back"
                        colorScheme="blue"
                        size="lg"
                        borderRadius="full"
                        color="black"
                        bg="#f8f4fc"
                    >
                        {<BackArrowIcon/>}
                    </IconButton>
                    <Heading
                        size={{base: "md", md: "lg"}}
                        as="h1"
                        fontWeight={600}
                        color="black"
                    >
                        {listTitle}
                    </Heading>
                </HStack>

                {/* Filters */}
                <HStack spacing={2} overflowX="auto" pb={2} display={{base: "flex"}}>
                    {filterButtons.map((button) => (
                        <Button
                            key={button.value}
                            size="sm"
                            variant={filterStatus === button.value ? "solid" : "outline"}
                            colorScheme={filterStatus === button.value ? "blue" : "gray"}
                            bg={filterStatus === button.value ? "black" : "white"}
                            color={filterStatus === button.value ? "white" : "black"}
                            onClick={() => setFilterStatus(button.value)}
                            borderRadius="md"
                            minW={{base: "auto", md: "80px"}}
                            px={{base: 3, md: 4}}
                            _hover={{
                                bg: button.value ? "gray.300" : "gray.100",
                                transform: "translateY(2px)",
                                boxShadow: "sm",
                            }}
                        >
                            {button.label}
                        </Button>
                    ))}
                </HStack>

                {/* Add New Task Button */}
                <Button
                    colorPalette="blue"
                    width={{base: "106px", sm: "106px", md: "106px", custom: "106px", lg: "130px"}}
                    mb={4}
                    borderRadius="8px"
                    fontSize={{base: "sm", sm: "sm", md: "sm", custom: "sm", lg: "md"}}
                    onClick={openAddTaskDialog}
                >
                    Add New Task
                </Button>

                {/* Todo Items List */}
                <VStack spacing={3} align="stretch">
                    {filteredItems.length === 0 && !isFetchingNextPage ? (
                        <Box textAlign="center" py={10} bg="white" borderRadius="lg" shadow="sm">
                            <Text fontSize="lg" color="black">No items found</Text>
                        </Box>
                    ) : (
                        filteredItems.map((item, index) => {
                            // Attach ref to the last item in the current list of filteredItems
                            if (filteredItems.length === index + 1) {
                                return (
                                    <TodoItemCard 
                                        ref={lastItemRef} 
                                        key={item.id}
                                        item={item}
                                        onEdit={() => openEditDialog(item)}
                                        onDelete={() => deleteItem.mutateAsync(item.id)}
                                        onOpenAssignDialog={openAssignDialog}
                                    />
                                );
                            }
                            return (
                                <TodoItemCard 
                                    key={item.id}
                                    item={item}
                                    onEdit={() => openEditDialog(item)}
                                    onDelete={() => deleteItem.mutateAsync(item.id)}
                                    onOpenAssignDialog={openAssignDialog}
                                />
                            );
                        })
                    )}
                    {isFetchingNextPage && (
                        <Box textAlign="center" py={5}><Text>Loading more tasks...</Text></Box>
                    )}
                    {!hasNextPage && allTodoItems.length > 0 && (
                         <Box textAlign="center" py={5}><Text>You've reached the end!</Text></Box>
                    )}
                </VStack>

                {/* "ADD NEW TASK" DIALOG JSX */}
                {isAddTaskDialogOpen && (
                    <Dialog.Root open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen} placement="center">
                        <Portal>
                            <Dialog.Backdrop/>
                            <Dialog.Positioner>
                                <Dialog.Content as="form" onSubmit={handleSubmit} mx={{base: 4, md: 0}}
                                                width={{base: "90%", md: "md"}}>
                                    <Dialog.Header pt={4} px={4} pb={2}>
                                        <Dialog.Title fontSize="lg" fontWeight="semibold">Add New Task</Dialog.Title>
                                    </Dialog.Header>
                                    <Dialog.Body px={4} pb={4}>
                                        <Field.Root name="title" required>
                                            <Field.Label>Title</Field.Label>
                                            <Input
                                                name="title"
                                                value={newTask.title}
                                                onChange={handleInputChange}
                                                placeholder={newTaskErrors.title || "Enter task title"}
                                                borderColor={newTaskErrors.title ? "red.500" : "inherit"}
                                                _placeholder={{ color: newTaskErrors.title ? "red.500" : "gray.500" }}
                                            />
                                        </Field.Root>

                                        <Field.Root name="description" mt={4}>
                                            <Field.Label>Description</Field.Label>
                                            <Textarea
                                                name="description"
                                                value={newTask.description}
                                                onChange={handleInputChange}
                                                placeholder={newTaskErrors.description || "Enter task description"}
                                                borderColor={newTaskErrors.description ? "red.500" : "inherit"}
                                                _placeholder={{ color: newTaskErrors.description ? "red.500" : "gray.500" }}
                                            />
                                        </Field.Root>

                                        <Field.Root name="status" mt={4} required>
                                            <Field.Label>Status</Field.Label>
                                            <NativeSelect.Root>
                                                <NativeSelect.Field
                                                    name="status"
                                                    value={newTask.status}
                                                    onChange={handleInputChange}
                                                    borderColor={newTaskErrors.status ? "red.500" : "inherit"}
                                                >
                                                    <option value="PENDING">Pending</option>
                                                    <option value="IN_PROGRESS">In Progress</option>
                                                    <option value="DONE">Done</option>
                                                </NativeSelect.Field>
                                                <NativeSelect.Indicator />
                                            </NativeSelect.Root>
                                        </Field.Root>

                                        <Field.Root name="assignee" mt={4}>
                                            <Field.Label>Assignee</Field.Label>
                                            <NativeSelect.Root>
                                                <NativeSelect.Field
                                                    name="assignee"
                                                    value={newTask.assignee}
                                                    onChange={handleInputChange}
                                                    borderColor={newTaskErrors.assignee ? "red.500" : "inherit"}
                                                    disabled={usersLoading}
                                                >
                                                    <option value="">
                                                        {usersLoading ? "Loading users..." : "Select assignee (optional)"}
                                                    </option>
                                                    {users?.map((user) => (
                                                        <option key={user.id} value={user.id}>
                                                            {user.id} - {user.first_name} {user.last_name}
                                                        </option>
                                                    ))}
                                                </NativeSelect.Field>
                                                <NativeSelect.Indicator />
                                            </NativeSelect.Root>
                                            {newTaskErrors.assignee && (
                                                <Text fontSize="sm" color="red.500" mt={1}>
                                                    {newTaskErrors.assignee}
                                                </Text>
                                            )}
                                        </Field.Root>
                                    </Dialog.Body>
                                    <Box display="flex" justifyContent="flex-end" px={4} pb={4} pt={2}>
                                        <Button colorPalette="blue" mr={3} type="submit">
                                            Save
                                        </Button>
                                        <Dialog.CloseTrigger asChild>
                                            <CloseButton onClick={closeAddTaskDialog} />
                                        </Dialog.CloseTrigger>
                                    </Box>
                                </Dialog.Content>
                            </Dialog.Positioner>
                        </Portal>
                    </Dialog.Root>
                )}

                {/* "EDIT TASK" DIALOG JSX */}
                {editTask && ( // Only render if an item is being edited
                    <Dialog.Root open={isEditOpen} onOpenChange={setIsEditOpen} placement="center">
                        <Portal>
                            <Dialog.Backdrop />
                            <Dialog.Positioner>
                                <Dialog.Content as="form" onSubmit={handleEditSubmit} mx={{ base: 4, md: 0 }} width={{ base: "90%", md: "md" }}>
                                    <Dialog.Header pt={4} px={4} pb={2}>
                                        <Dialog.Title fontSize="lg" fontWeight="semibold">Edit Task</Dialog.Title>
                                    </Dialog.Header>
                                    <Dialog.Body px={4} pb={4}>
                                        {/* Title Field */}
                                        <Field.Root name="title" mb={3} required>
                                            <Field.Label>Title</Field.Label>
                                            <Input
                                                name="title"
                                                value={editTask.title || ""}
                                                onChange={handleEditInputChange}
                                                placeholder={editTaskErrors.title || "Enter task title"}
                                                borderColor={editTaskErrors.title ? "red.500" : "inherit"}
                                                _placeholder={{ color: editTaskErrors.title ? "red.500" : "gray.500" }}
                                            />
                                        </Field.Root>
                                        {/* Description Field */}
                                        <Field.Root name="description" mt={4} mb={3}>
                                            <Field.Label>Description</Field.Label>
                                            <Textarea
                                                name="description"
                                                value={editTask.description || ""}
                                                onChange={handleEditInputChange}
                                                placeholder={editTaskErrors.description || "Enter task description"}
                                                borderColor={editTaskErrors.description ? "red.500" : "inherit"}
                                                _placeholder={{ color: editTaskErrors.description ? "red.500" : "gray.500" }}
                                            />
                                        </Field.Root>
                                        {/* Status Field */}
                                        <Field.Root name="status" mt={4} mb={3} required>
                                            <Field.Label>Status</Field.Label>
                                            <NativeSelect.Root>
                                                <NativeSelect.Field
                                                    name="status"
                                                    value={editTask.status || "PENDING"}
                                                    onChange={handleEditInputChange}
                                                    borderColor={editTaskErrors.status ? "red.500" : "inherit"}
                                                >
                                                    <option value="PENDING">Pending</option>
                                                    <option value="IN_PROGRESS">In Progress</option>
                                                    <option value="DONE">Done</option>
                                                </NativeSelect.Field>
                                                <NativeSelect.Indicator />
                                            </NativeSelect.Root>
                                        </Field.Root>
                                        {/* Assignee Field */}
                                        <Field.Root name="assignee" mt={4} mb={3}>
                                            <Field.Label>Assignee</Field.Label>
                                            <NativeSelect.Root>
                                                <NativeSelect.Field
                                                    name="assignee"
                                                    value={editTask.assignee || ""} 
                                                    onChange={handleEditInputChange}
                                                    borderColor={editTaskErrors.assignee ? "red.500" : "inherit"}
                                                    disabled={usersLoading}
                                                >
                                                    <option value="">
                                                        {usersLoading ? "Loading users..." : "Select assignee (optional)"}
                                                    </option>
                                                    {users?.map((user) => (
                                                        <option key={user.id} value={user.id}>
                                                            {user.id} - {user.first_name} {user.last_name}
                                                        </option>
                                                    ))}
                                                </NativeSelect.Field>
                                                <NativeSelect.Indicator />
                                            </NativeSelect.Root>
                                            {editTaskErrors.assignee && (
                                                <Text fontSize="sm" color="red.500" mt={1}>
                                                    {editTaskErrors.assignee}
                                                </Text>
                                            )}
                                        </Field.Root>
                                    </Dialog.Body>
                                    <Box display="flex" justifyContent="flex-end" px={4} pb={4} pt={2}>
                                        <Button colorPalette="blue" mr={3} type="submit">
                                            Save Changes
                                        </Button>
                                        <Dialog.CloseTrigger asChild>
                                            <CloseButton onClick={closeEditDialog} />
                                        </Dialog.CloseTrigger>
                                    </Box>
                                </Dialog.Content>
                            </Dialog.Positioner>
                        </Portal>
                    </Dialog.Root>
                )}

                {/* "ASSIGN TO OTHER" DIALOG JSX */}
                {taskToAssign && (
                    <Dialog.Root open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen} placement="center">
                        <Portal>
                            <Dialog.Backdrop />
                            <Dialog.Positioner>
                                <Dialog.Content as="form" onSubmit={handleAssignSubmit} mx={{ base: 4, md: 0 }} width={{ base: "90%", md: "md" }}>
                                    <Dialog.Header pt={4} px={4} pb={2}>
                                        <Dialog.Title fontSize="lg" fontWeight="semibold">Assign Task to Other</Dialog.Title>
                                    </Dialog.Header>
                                    <Dialog.Body px={4} pb={4}>
                                        <Text mb={2}>Assigning task: <strong>{taskToAssign.title}</strong></Text>
                                        <Field.Root name="newAssigneeId" required>
                                            <Field.Label>New Assignee</Field.Label>
                                            <NativeSelect.Root>
                                                <NativeSelect.Field
                                                    name="newAssigneeId"
                                                    value={newAssigneeId}
                                                    onChange={(e) => {
                                                        setNewAssigneeId(e.target.value);
                                                        // Clear error when user starts typing
                                                        if (assignError) {
                                                            setAssignError("");
                                                        }
                                                    }}
                                                    borderColor={assignError ? "red.500" : "inherit"}
                                                    disabled={usersLoading}
                                                >
                                                    <option value="">
                                                        {usersLoading ? "Loading users..." : "Select new assignee"}
                                                    </option>
                                                    {users?.map((user) => (
                                                        <option key={user.id} value={user.id}>
                                                            {user.id} - {user.first_name} {user.last_name}
                                                        </option>
                                                    ))}
                                                </NativeSelect.Field>
                                                <NativeSelect.Indicator />
                                            </NativeSelect.Root>
                                            {assignError && (
                                                <Text fontSize="sm" color="red.500" mt={1}>
                                                    {assignError}
                                                </Text>
                                            )}
                                        </Field.Root>
                                    </Dialog.Body>
                                    <Box display="flex" justifyContent="flex-end" px={4} pb={4} pt={2}>
                                        <Button colorPalette="blue" mr={3} type="submit" isLoading={updateItem.isLoading}>
                                            Assign
                                        </Button>
                                        <Dialog.CloseTrigger asChild>
                                            <CloseButton onClick={closeAssignDialog} />
                                        </Dialog.CloseTrigger>
                                    </Box>
                                </Dialog.Content>
                            </Dialog.Positioner>
                        </Portal>
                    </Dialog.Root>
                )}
            </VStack>
        </Box>
    );
};

export default TodoDetails; 