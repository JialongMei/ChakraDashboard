import LayoutWrapper from "../components/LayoutWrapper";
import {
    createIcon,
    Box,
    Button,
    Flex,
    HStack,
    Icon,
    Image,
    SimpleGrid,
    Text,
    VStack,
    Tag,
    Badge,
    useBreakpointValue
} from "@chakra-ui/react";
import { ReactComponent as Search_normal } from "../icon/search-normal.svg";
import { useLocation, useNavigate } from "react-router-dom";
import Image1 from "../image/img_1.png";
import { useState, useEffect } from "react";
const index = 3;

const SearchIcon = createIcon({
    displayName: "SearchIcon",
    viewBox: "0 0 24 24",
    defaultProps: {
        color: "#161819",
        opacity: 0.5,
    },
    path: (
        <>
            <path
                d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            <path
                d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </>
    ),
});

const ListItem = ({ textContent, textColor, badgeColor }) => {
    // Use window width for custom breakpoints
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Define our breakpoints more explicitly
    const isMiniView = windowWidth <= 374;
    const isSmallScreen = windowWidth <= 457;
    const shouldShowIconButtons = windowWidth <= 888; // Show icon buttons at 888px and below
    const isMobileView = windowWidth < 768; // Standard mobile layout below md breakpoint

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <HStack
            bg="white"
            p={3}
            borderRadius="16px"
            alignItems="flex-start"
            justifyContent="space-between"
            height={{ base: "90px", md: "100px" }}
            spacing={2}
            flexWrap={{ base: "wrap", md: "nowrap" }}
        >
            <Flex>
                <Box
                    width={{ base: "70px", md: "80px" }}
                    height={{ base: "70px", md: "80px" }}
                    borderRadius="8px"
                    overflow="hidden"
                    flexShrink={0}
                >
                    <Image src={Image1} width="100%" height="100%" objectFit="cover" />
                </Box>
                <Box
                    width={{ base: "100px", sm: "150px", md: "100%" }}
                    ml={isSmallScreen ? 2 : 4}
                    mt={{ base: 1, md: 4 }}
                    overflow="hidden"
                    display={isMiniView ? "none" : "block"} // Hide text on mobile view
                >
                    <Text
                        fontSize={{ base: "xs", sm: "sm", md: "16px" }}
                        fontWeight={500}
                        noOfLines={1}
                        overflow="hidden"
                        textOverflow="ellipsis"
                        width="100%"
                        color="black"
                        isTruncated
                    >
                        Product title goes here
                    </Text>
                    <Text
                        fontSize={{ base: "2xs", sm: "12px" }}
                        fontWeight={400}
                        opacity={0.6}
                        noOfLines={{ base: 1, md: 1 }}
                        overflow="hidden"
                        textOverflow="ellipsis"
                        width="100%"
                        color="gray.500"
                        isTruncated
                    >
                        https://yourproducturlgoeshere1122.com
                    </Text>
                </Box>
                <Badge
                    borderRadius="lg"
                    ml={isSmallScreen ? 1 : 4}
                    mt={7}
                    mb={5}
                    bg={badgeColor}
                    px={isSmallScreen ? 1.5 : 3}
                    py={isSmallScreen ? 0.5 : 1}
                    variant="solid"
                    fontSize={isSmallScreen ? "xs" : "sm"}
                >
                    <Text
                        color={textColor}
                        fontSize={isSmallScreen ? "xs" : "inherit"}
                        whiteSpace={isSmallScreen ? "normal" : "no"} // Allows text to wrap
                        textAlign="center" // Centers the text
                    >
                        {textContent}
                    </Text>
                </Badge>
            </Flex>

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
                        bg="black"
                        color="white"
                        _hover={{ bg: "gray.700" }}
                        height={{ base: "30px", md: "36px" }}
                        width="36px"
                        minWidth="36px"
                        p={0}
                    >
                        <SearchIcon color="white" boxSize={4} />
                    </Button>
                    <Button
                        size="sm"
                        bg="#6F6CF3"
                        color="white"
                        _hover={{ bg: "#5957d7" }}
                        height={{ base: "30px", md: "36px" }}
                        width="36px"
                        minWidth="36px"
                        p={0}
                    >
                        <SearchIcon color="white" boxSize={4} />
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
                        bg="black"
                        color="white"
                        _hover={{ bg: "gray.700" }}
                        height="36px"
                        width="36px"
                        minWidth="36px"
                        p={0}
                        borderRadius="8px"
                    >
                        <SearchIcon color="white" boxSize={4} />
                    </Button>
                    <Button
                        size="sm"
                        bg="#6F6CF3"
                        color="white"
                        _hover={{ bg: "#5957d7" }}
                        height="36px"
                        width="36px"
                        minWidth="36px"
                        p={0}
                        borderRadius="8px"
                    >
                        <SearchIcon color="white" boxSize={4} />
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
                        bg="black"
                        color="white"
                        borderRadius="8px"
                        width={{ md: "50px", lg: "101px" }}
                        _hover={{ bg: "gray.700" }}
                        height={{ md: "36px", lg: "54px" }}
                        fontSize={{ md: "14px" }}
                        px={{ md: 4 }}
                    >
                        Source
                    </Button>
                    <Button
                        size="sm"
                        bg="#6F6CF3"
                        color="white"
                        borderRadius="8px"
                        _hover={{ bg: "#5957d7" }}
                        width={{ md: "90px", lg: "160px" }}
                        height={{ md: "36px", lg: "54px" }}
                        fontSize={{ md: "14px" }}
                        px={{ md: 4 }}
                    >
                        View Details
                    </Button>
                </HStack>
            )}
        </HStack>
    );
};

const MainContent = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isGridView = location.pathname.includes("/grid");
    const isListView = location.pathname.includes("/list");

    return (
        <Box>
            <Flex
                justify="space-between"
                align="center"
                flexDirection={{ base: "column", md: "row" }}
                gap={{ base: 3, md: 0 }}
                mb={{ base: 4, md: 6 }}
                pt={{ base: 2, md: 0 }}
            >
                <Text fontWeight="medium" fontSize={{ base: "md", md: "lg" }} color="black">
                    Product List
                </Text>

                <Flex align="center" flexWrap="wrap" gap={2}>
                    <Button
                        size="sm"
                        onClick={() => navigate("/dashboard/reviews/grid")}
                        bg={isGridView ? "black" : "white"}
                        color={isGridView ? "white" : "black"}
                        borderRadius="md"
                        fontWeight="medium"
                        height="40px"
                        Width="110px"
                        minWidth="80px"
                        _hover={{
                            bg: isGridView ? "gray.800" : "gray.100",
                            transform: "translateY(-2px)",
                            boxShadow: "sm",
                        }}
                    >
                        Grid View
                    </Button>
                    <Button
                        size="sm"
                        onClick={() => navigate("/dashboard/reviews/list")}
                        bg={isListView ? "black" : "white"}
                        color={isListView ? "white" : "black"}
                        borderRadius="md"
                        fontWeight="medium"
                        height="40px"
                        Width="110px"
                        minWidth="80px"
                        _hover={{
                            bg: isListView ? "gray.800" : "gray.100",
                            transform: "translateY(-2px)",
                            boxShadow: "sm",
                        }}
                    >
                        List View
                    </Button>
                </Flex>
            </Flex>

            <Box
                overflow="hidden"
                height="fit-content"
                minHeight="0"
            >
                <SimpleGrid columns={1} spacing={{ base: 3, md: 4 }} gap={{ base: "2", sm: "4", md: "5" }}>
                    {[...Array(2)].map((_, index) => (
                        <ListItem
                            key={index}
                            textContent={`Removed`}
                            textColor="#42AA65"
                            badgeColor={index === 3 ? "#FFEFE7" : "#EBFDEF"}
                        />
                    ))}
                    <ListItem
                        key={index}
                        textContent={`Reminder Sent`}
                        textColor="#FF9600"
                        badgeColor={index === 3 ? "#FFEFE7" : "#EBFDEF"}
                    />
                    {[...Array(3)].map((_, index) => (
                        <ListItem
                            key={index}
                            textContent={`Removed`}
                            textColor="#42AA65"
                            badgeColor={index === 3 ? "#FFEFE7" : "#EBFDEF"}
                        />
                    ))}
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default function ProductList() {
    return (
        <MainContent />
    );
}