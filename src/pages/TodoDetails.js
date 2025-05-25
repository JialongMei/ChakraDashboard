import React, {useEffect, useState} from "react";
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
    useDisclosure,
    VStack,
    NativeSelect,
} from "@chakra-ui/react";
import {initialTodoListsData} from "../data/todoData.js";
import {useCreateTodoItem, useTodoItems, useDeleteTodoItem, useUpdateTodoItem} from "../api/todoApi";
import {useAuth} from "../context/AuthContext";

// Back arrow icon
const BackArrowIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 12H5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 19L5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const TodoItemCard = ({item, onEdit, onDelete}) => {
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

                <VStack align="flex-start" spacing={2} flex="1">
                    <HStack width="100%" justifyContent="space-between" alignItems="center">
                        <Text
                            fontSize={{base: "sm", md: "md"}}
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
                <HStack spacing={2}>
                    <Button
                        size="sm"
                        bg="#A3A1FF"
                        color="white"
                        borderRadius="8px"
                        _hover={{bg: "#8583F4"}}
                        height="36px"
                        fontSize="xs"
                        px={3}
                        onClick={onEdit}
                    >
                        Edit
                    </Button>
                    <Button
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
                </HStack>
            )}

            {isMobileView && (
                <HStack spacing={2} width="100%" mt={2} justifyContent="flex-end">
                    <Button
                        size="sm"
                        bg="#A3A1FF"
                        color="white"
                        borderRadius="8px"
                        _hover={{bg: "#8583F4"}}
                        height="30px"
                        fontSize="xs"
                        px={3}
                        onClick={onEdit}
                    >
                        Edit
                    </Button>
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
};

const TodoDetails = message => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [todoItems, setTodoItems] = useState([]);
    const [listTitle, setListTitle] = useState("");
    const [filterStatus, setFilterStatus] = useState("ALL");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
    // State for "Add New Task" Dialog
    const {isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose} = useDisclosure(); // For Add Task Modal

    // State and handlers for "Edit Task" Dialog
    const [editTask, setEditTask] = useState(null); // Holds the item being edited
    const [isEditOpen, setIsEditOpen] = useState(false); // Controls edit dialog visibility

    const {
        data: items,
        isLoading: itemsLoading,
        error: itemsError
    } = useTodoItems(id);

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

    useEffect(() => {
        if (items && Array.isArray(items.items)) {
            setTodoItems(items.items);
        }
    }, [items]);

    const filteredItems = filterStatus === "ALL"
        ? todoItems
        : todoItems.filter(item => item.status === filterStatus);

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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await hanldeCreateItem({
                ...newTask,
                todo_list: id,
            });
            setNewTask({
                title: "",
                description: "",
                status: "PENDING",
                assignee: "",
            });
            onAddClose(); // Use onAddClose if using useDisclosure for add
        } catch (error) {
            alert("Error creating task: " + error.message);
        }
    };

    const createItem = useCreateTodoItem(id);
    const updateItem = useUpdateTodoItem(id);
    const deleteItem = useDeleteTodoItem(id);

    const hanldeCreateItem = async(newItem) => {
        try {
            await createItem.mutateAsync(newItem);
            alert("Task created successfully!");
        } catch (error) {
            alert("Error creating task:", error.message);
        }
    }

    const openEditDialog = (itemToEdit) => {
        setEditTask({ // Pre-fill the form with the item's current data
            ...itemToEdit,
            // Handle assignee, which might be an object or just an ID/name
            assignee: itemToEdit.assignee ? (itemToEdit.assignee.name || itemToEdit.assignee) : "",
        });
        setIsEditOpen(true);
    };

    const closeEditDialog = () => {
        setIsEditOpen(false);
        setEditTask(null); // Clear the edit task data
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditTask(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editTask || !editTask.id) return; // Safety check

        try {
            // eslint-disable-next-line no-unused-vars
            const { id: itemId, todo_list, created_at, last_modified, ...dataToUpdate } = editTask;
            // Prepare the payload, ensuring only editable fields are sent
            // If your backend expects assignee as an ID, you might need to adjust 'dataToUpdate.assignee' here.
            await updateItem.mutateAsync({ itemId, updatedData: dataToUpdate });
            closeEditDialog();
            // Items list will refetch due to React Query's onSuccess invalidation in useUpdateTodoItem
        } catch (error) {
            alert("Error updating task: " + error.message);
        }
    };

    return (
        <Box p={{base: 2, md: 4}} maxW="100%" mx="auto">
            <VStack spacing={{base: 3, md: 4}} align="stretch" maxW="1600px" mx="auto">
                {/* Header */}
                <HStack spacing={4} alignItems="center">
                    <IconButton
                        onClick={() => navigate("/dashboard/todolist")}
                        icon={<BackArrowIcon/>}
                        aria-label="Go back"
                        colorScheme="blue"
                        size="md"
                        borderRadius="full"
                    />
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

                {/* Add New Task Button and Dialog Structure */}
                <Dialog.Root
                    placement="center"
                >
                    <Dialog.Trigger asChild>
                        <Button
                            colorPalette="blue"
                            width={{base: "106px", sm: "106px", md: "106px", custom: "106px", lg: "130px"}}
                            mb={4}
                            borderRadius="8px"
                            fontSize={{base: "sm", sm: "sm", md: "sm", custom: "sm", lg: "md"}}
                        >
                            Add New Task
                        </Button>
                    </Dialog.Trigger>

                    {/* Dialog Portal and Content */}
                    <Portal>
                        <Dialog.Backdrop/>
                        <Dialog.Positioner>
                            <Dialog.Content as="form" onSubmit={handleSubmit} mx={{base: 4, md: 0}}
                                            width={{base: "90%", md: "md"}}>
                                <Dialog.Header pt={4} px={4} pb={2}> {/* Adjusted padding */}
                                    <Dialog.Title fontSize="lg" fontWeight="semibold">Add New Task</Dialog.Title> {/* Used Dialog.Title */}
                                </Dialog.Header>
                                <Dialog.Body px={4} pb={4}> {/* Adjusted padding */}
                                    <Field.Root name="title" required>
                                        <Field.Label>Title</Field.Label>
                                        <Input
                                            name="title"
                                            value={newTask.title}
                                            onChange={handleInputChange}
                                            placeholder="Enter task title"
                                        />
                                    </Field.Root>

                                    <Field.Root name="description" mt={4}>
                                        <Field.Label>Description</Field.Label>
                                        <Textarea
                                            name="description"
                                            value={newTask.description}
                                            onChange={handleInputChange}
                                            placeholder="Enter task description"
                                        />
                                    </Field.Root>

                                    <Field.Root name="status" mt={4} required>
                                        <Field.Label>Status</Field.Label>
                                        <NativeSelect.Root>
                                            <NativeSelect.Field>
                                                <option value="PENDING">Pending</option>
                                                <option value="IN_PROGRESS">In Progress</option>
                                                <option value="DONE">Done</option>
                                            </NativeSelect.Field>
                                            <NativeSelect.Indicator />
                                        </NativeSelect.Root>
                                    </Field.Root>

                                    <Field.Root name="assignee" mt={4}>
                                        <Field.Label>Assignee</Field.Label>
                                        <Input
                                            name="assignee"
                                            value={newTask.assignee}
                                            onChange={handleInputChange}
                                            placeholder="Enter assignee name or ID"
                                        />
                                    </Field.Root>
                                </Dialog.Body>
                                {/* Simplified Footer using Box */}
                                <Box display="flex" justifyContent="flex-end" px={4} pb={4} pt={2}>
                                    <Button colorPalette="blue" mr={3} type="submit">
                                        Save
                                    </Button>
                                    <Dialog.CloseTrigger asChild>
                                        <CloseButton size="sm"/>
                                    </Dialog.CloseTrigger>
                                </Box>
                            </Dialog.Content>
                        </Dialog.Positioner>
                    </Portal>
                </Dialog.Root>

                {/* Todo Items List */}
                <VStack spacing={3} align="stretch">
                    {filteredItems.length === 0 ? (
                        <Box textAlign="center" py={10} bg="white" borderRadius="lg" shadow="sm">
                            <Text fontSize="lg" color="black">No item found</Text>
                        </Box>
                    ) : (
                        filteredItems.map(item => (
                            <TodoItemCard key={item.id}
                                          item={item}
                                          onEdit={() => openEditDialog(item)}
                                          onDelete={() => deleteItem.mutateAsync(item.id)}/>
                        ))
                    )}
                </VStack>

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
                                                placeholder="Enter task title"
                                            />
                                        </Field.Root>
                                        {/* Description Field */}
                                        <Field.Root name="description" mt={4} mb={3}>
                                            <Field.Label>Description</Field.Label>
                                            <Textarea
                                                name="description"
                                                value={editTask.description || ""}
                                                onChange={handleEditInputChange}
                                                placeholder="Enter task description"
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
                                            <Input
                                                name="assignee"
                                                value={editTask.assignee || ""} 
                                                onChange={handleEditInputChange}
                                                placeholder="Enter assignee name or ID"
                                            />
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
            </VStack>
        </Box>
    );
};

export default TodoDetails; 