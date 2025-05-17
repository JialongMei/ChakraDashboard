import React, {useEffect, useState} from "react";
import {Box, Button, Checkbox, createIcon, Flex, HStack, List, Text, VStack} from "@chakra-ui/react"
import {SearchIcon} from "./List";
import { useNavigate } from "react-router-dom";
import { initialTodoListsData } from "../data/todoData.js";

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

const ListCard = ({title, owner, items, id, ...props}) => {
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
// isolate this file start with simple stuff
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
            flexWrap={{base: "wrap", md: "nowrap"}}
        >
            <HStack
                alignItems="flex-start"
                width={{base: "50%", sm: "70%", md: "100%"}}
                ml={isSmallScreen ? 2 : 4}
                overflow="hidden"
                display={isMiniView ? "none" : "flex"}
                height="100%"
            >
                <Checkbox.Root display="flex" alignItems="center" width={"150px"}>
                    <Checkbox.HiddenInput/>
                    <Checkbox.Control/>
                    <Checkbox.Label>
                        <Text
                            fontSize={{base: "xs", sm: "sm", md: "16px"}}
                            fontWeight={500}
                            noOfLines={1}
                            overflow="hidden"
                            textOverflow="ellipsis"
                            color="black"
                            isTruncated
                            maxW={{base: "45px", sm: "70px", md: "150px"}}
                        >
                            {title}
                        </Text>
                    </Checkbox.Label>
                </Checkbox.Root>
                <List.Root 
                    flexGrow={1} 
                    ml={{base: 4, sm: 8, md: 12}}
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    gap={2}
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
                    height="100%"
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
                    height="100%"
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
                    height="100%"
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
                    >
                        Delete
                    </Button>
                </HStack>
            )}
        </HStack>
    );
};

const TodoList = () => {
    const [todoLists, setTodoLists] = useState(initialTodoListsData);

    return (
        <Box>
            <VStack spacing={4} align="stretch">
                {todoLists.map((todo) => (
                    <ListCard
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        owner={todo.owner}
                        items={todo.items.map(item => item.text)}
                    />
                ))}
            </VStack>
        </Box>
    );
};

export default TodoList;