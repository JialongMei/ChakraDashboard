import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  HStack,
  VStack,
  Text,
  Badge,
  Flex,
  IconButton,
  Checkbox,
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogCloseButton,
  DialogBody,
  DialogFooter,
  Portal,
  Input,
  Textarea,
  Select,
  useDisclosure,
  CloseButton,
  Field,
} from "@chakra-ui/react";
import { initialTodoListsData } from "../data/todoData.js";

// Sample data model for todo items
const generateSampleItems = (listId) => {
  const assignees = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
    { id: 4, name: "Bob Wilson" },
    { id: 5, name: "Sarah Brown" }
  ];
  const numItems = Math.floor(Math.random() * 5) + 8;
  const items = [];
  let titleOptions = [];
  let descriptionPrefix = "";
  switch(parseInt(listId)) {
    case 1: titleOptions = ["Call doctor for appointment", "Buy birthday gift", "Plan weekend activities", "Clean garage", "Organize photos", "Pay utility bills", "Schedule car maintenance", "Research vacation options", "Update personal budget", "Renew gym membership", "Buy groceries for the week", "Fix broken kitchen drawer"]; descriptionPrefix = "I need to "; break;
    case 2: titleOptions = ["Prepare quarterly report", "Schedule team meeting", "Update documentation", "Review pull requests", "Respond to client emails", "Fix high-priority bugs", "Create presentation for stakeholders", "Plan next sprint", "Update project roadmap", "Interview candidates", "Complete performance reviews", "Deploy latest features"]; descriptionPrefix = "The team needs to "; break;
    case 3: titleOptions = ["Buy fresh produce", "Order new phone case", "Get kitchen supplies", "Purchase home office desk", "Find gifts for holidays", "Order books online", "Get new workout clothes", "Replace bathroom towels", "Shop for dinner party ingredients", "Order new laptop", "Buy art supplies", "Purchase garden tools"]; descriptionPrefix = "We should "; break;
    case 4: titleOptions = ["Finalize design mockups", "Implement authentication", "Test user flows", "Set up CI/CD pipeline", "Create API documentation", "Optimize database queries", "Fix frontend responsiveness", "Add analytics tracking", "Prepare for beta release", "Create user onboarding flow", "Integrate third-party services", "Security audit"]; descriptionPrefix = "The project requires us to "; break;
    case 5: titleOptions = ["Replace air filters", "Clean gutters", "Check smoke detectors", "Service HVAC system", "Fix leaky faucet", "Paint living room walls", "Clean carpets", "Fix broken tiles", "Repair fence", "Schedule pest control", "Replace porch light", "Fix garage door"]; descriptionPrefix = "Home maintenance task: "; break;
    case 6: titleOptions = ["Schedule annual checkup", "Plan weekly meals", "Track daily workouts", "Research new exercise routine", "Find healthy recipes", "Buy new running shoes", "Schedule dental cleaning", "Meditate daily", "Track sleep patterns", "Take vitamins", "Prepare protein shakes", "Get blood work done"]; descriptionPrefix = "For better health, I should "; break;
    default: titleOptions = ["Complete task", "Review item", "Plan next steps", "Schedule meeting", "Follow up on progress", "Update status", "Check requirements", "Document process", "Share results", "Submit report", "Track metrics", "Analyze data"]; descriptionPrefix = "This task requires: ";
  }
  const shuffledTitles = [...titleOptions].sort(() => 0.5 - Math.random());
  for (let i = 0; i < numItems; i++) {
    const assignee = assignees[Math.floor(Math.random() * assignees.length)];
    const status = ["PENDING", "IN_PROGRESS", "DONE"][Math.floor(Math.random() * 3)];
    const createdDate = new Date(); createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 10));
    const modifiedDate = new Date(createdDate); modifiedDate.setHours(modifiedDate.getHours() + Math.floor(Math.random() * 48));
    items.push({
      id: i + 1,
      title: shuffledTitles[i % shuffledTitles.length],
      description: `${descriptionPrefix}${shuffledTitles[i % shuffledTitles.length].toLowerCase()}. This is a detailed description of what needs to be done for this task.`,
      status,
      assignee,
      created_at: createdDate.toISOString(),
      last_modified: modifiedDate.toISOString()
    });
  }
  return items;
};

// Back arrow icon
const BackArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TodoItemCard = ({ item }) => {
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
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getStatusColor = (status) => {
    switch(status) {
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
    >
      <HStack spacing={3} flex="1" alignItems="center">
        <Checkbox.Root display="flex" alignItems="center">
          <Checkbox.HiddenInput />
          <Checkbox.Control />
        </Checkbox.Root>
        
        <VStack align="flex-start" spacing={2} flex="1">
          <HStack width="100%" justifyContent="space-between" alignItems="center">
            <Text
              fontSize={{ base: "sm", md: "md" }}
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
            fontSize={{ base: "xs", md: "sm" }} 
            color="gray.600"
            noOfLines={isMobileView ? 2 : 3}
          >
            {item.description}
          </Text>
          
          <HStack width="100%" justifyContent="space-between" alignItems="center" mt={1}>
            <HStack spacing={2}>
              <Text fontSize="xs" color="gray.700">{item.assignee.name}</Text>
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
            _hover={{ bg: "#8583F4" }}
            height="36px"
            fontSize="xs"
            px={3}
          >
            Edit
          </Button>
          <Button
            size="sm"
            bg="gray.500"
            color="white"
            borderRadius="8px"
            _hover={{ bg: "gray.600" }}
            height="36px"
            fontSize="xs"
            px={3}
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
            _hover={{ bg: "#8583F4" }}
            height="30px"
            fontSize="xs"
            px={3}
          >
            Edit
          </Button>
          <Button
            size="sm"
            bg="gray.500"
            color="white"
            borderRadius="8px"
            _hover={{ bg: "gray.600" }}
            height="30px"
            fontSize="xs"
            px={3}
          >
            Delete
          </Button>
        </HStack>
      )}
    </HStack>
  );
};

const TodoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todoItems, setTodoItems] = useState([]);
  const [listTitle, setListTitle] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { isOpen, onOpen, onClose } = useDisclosure(); // For Add Task Modal
  
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
    const currentList = initialTodoListsData.find(list => list.id.toString() === id);
    if (currentList) {
      setListTitle(currentList.title);
    } else {
      setListTitle(`Todo List ${id}`); 
    }
    setTodoItems(generateSampleItems(id));
  }, [id]);
  
  const filteredItems = filterStatus === "ALL" 
    ? todoItems 
    : todoItems.filter(item => item.status === filterStatus);
  
  // Filter buttons data
  const filterButtons = [
    { label: "All", value: "ALL" },
    { label: "Pending", value: "PENDING" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Done", value: "DONE" }
  ];
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to create the task
    console.log("New task data:", newTask);
    // Reset form
    setNewTask({
      title: "",
      description: "",
      status: "PENDING",
      assignee: "",
    });
    onClose(); // Close modal after submission
  };

  return (
    <Box p={{ base: 2, md: 4 }} maxW="100%" mx="auto">
      <VStack spacing={{ base: 3, md: 4 }} align="stretch" maxW="1600px" mx="auto">
        {/* Header */}
        <HStack spacing={4} alignItems="center">
          <IconButton
            onClick={() => navigate("/dashboard/todolist")}
            icon={<BackArrowIcon />}
            aria-label="Go back"
            colorScheme="blue"
            size="md"
            borderRadius="full"
          />
          <Heading 
            size={{ base: "md", md: "lg" }} 
            as="h1"
            fontWeight={600}
            color="black"
          >
            {listTitle}
          </Heading>
        </HStack>
        
        {/* Filters */}
        <HStack spacing={2} overflowX="auto" pb={2} display={{ base: "flex" }}>
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
              minW={{ base: "auto", md: "80px" }}
              px={{ base: 3, md: 4 }}
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
          open={isOpen} 
          onOpenChange={(details) => { if (!details.open) onClose(); }} 
          placement="center"
        >
          <Box width="100%"> {/* Wrapper for the trigger button if needed for layout */}
            <Dialog.Trigger asChild>
              <Button
                colorPalette="blue"
                width={{ base: "100%", md: "auto" }}
                mb={4}
                borderRadius="8px"
                // onClick={onOpen} REMOVED - Dialog.Trigger handles this
              >
                Add New Task
              </Button>
            </Dialog.Trigger>
          </Box>

          {/* Dialog Portal and Content - Rendered conditionally by Dialog.Root logic based on 'open' prop */}
          {/* No need for explicit {isOpen && (...)} here if Dialog.Root handles presence via 'open' prop */}
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content as="form" onSubmit={handleSubmit} mx={{ base: 4, md: 0 }} width={{base: "90%", md: "md"}}>
                <Dialog.Header pt={4} px={4} pb={2}> {/* Adjusted padding */}
                  <Dialog.Title fontSize="lg" fontWeight="semibold">Add New Task</Dialog.Title> {/* Used Dialog.Title */}
                  <Dialog.CloseTrigger asChild>
                    <CloseButton position="absolute" top="10px" right="10px" /> {/* Standard CloseButton */}
                  </Dialog.CloseTrigger>
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
                    <Select
                      name="status"
                      value={newTask.status}
                      onChange={handleInputChange}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="DONE">Done</option>
                    </Select>
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
                  <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </Box>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root> {/* Moved Dialog.Root to wrap the trigger too */} 
        
        {/* Todo Items List */}
        <VStack spacing={3} align="stretch">
          {filteredItems.length === 0 ? (
            <Box textAlign="center" py={10} bg="white" borderRadius="lg" shadow="sm">
              <Text fontSize="lg" color="black">No items found with the selected filter.</Text>
            </Box>
          ) : (
            filteredItems.map(item => (
              <TodoItemCard key={item.id} item={item} />
            ))
          )}
        </VStack>
      </VStack>
    </Box>
  );
};

export default TodoDetails; 