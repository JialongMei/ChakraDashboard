import LayoutWrapper from "../components/LayoutWrapper";
import { createIcon, Box, Button, Flex, HStack, Icon, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { ReactComponent as Search_normal } from "../icon/search-normal.svg";
import { useLocation, useNavigate } from "react-router-dom";
import Image1 from "../image/img_1.png";

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


const ListItem = () => {
    return (
        <HStack
            bg="white"
            p={3}
            borderRadius="lg"
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
                    borderRadius="md"
                    overflow="hidden"
                    flexShrink={0}
                >
                    <Image src={Image1} width="100%" height="100%" objectFit="cover" />
                </Box>
                <Box
                    width={{ base: "100px", sm: "150px", md: "100%" }}
                    ml={4}
                    mt={4}
                    overflow="hidden"
                >
                    <Text
                        fontSize={{ base: "xs", sm: "sm", md: "md" }}
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
                        fontSize={{ base: "2xs", sm: "xs" }}
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
                <Box
                    borderRadius="lg"
                    width="95px"
                    height="34px"
                    ml={4}
                    mt={6}
                    bg="green.100"
                    px={3}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Text color="green.500">Removed</Text>
                </Box>
            </Flex>
            <VStack
                spacing={2}
                flexShrink={0}
                alignItems="center"
                height="100%"
                display={{ base: "flex", md: "none" }}
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
                    <SearchIcon  color="white" boxSize={4} />
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
                    <SearchIcon  color="white" boxSize={4} />
                </Button>
            </VStack>
            <HStack
                spacing={2}
                flexShrink={0}
                alignItems="center"
                height="100%"
                display={{ base: "none", md: "flex" }}
            >
                <Button
                    size="sm"
                    bg="black"
                    color="white"
                    _hover={{ bg: "gray.700" }}
                    height={{ base: "30px", md: "36px" }}
                    fontSize={{ base: "xs", md: "sm" }}
                    px={{ base: 3, md: 4 }}
                >
                    Source
                </Button>
                <Button
                    size="sm"
                    bg="#6F6CF3"
                    color="white"
                    _hover={{ bg: "#5957d7" }}
                    height={{ base: "30px", md: "36px" }}
                    fontSize={{ base: "xs", md: "sm" }}
                    px={{ base: 3, md: 4 }}
                >
                    View Details
                </Button>
            </HStack>
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
                        height="30px"
                        minWidth="80px"
                        border="1px solid"
                        borderColor={isGridView ? "black" : "gray.200"}
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
                        height="30px"
                        minWidth="80px"
                        border="1px solid"
                        borderColor={isListView ? "black" : "gray.200"}
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
                overflow="auto"
                height="fit-content"
                minHeight="0"
            >
                <SimpleGrid columns={1} spacing={{ base: 3, md: 4 }} gap={{ base: "2", sm: "4", md: "5" }}>
                    {[...Array(2)].map((_, index) => (
                        <ListItem key={index} />
                    ))}
                    <HStack
                        bg="white"
                        p={3}
                        borderRadius="lg"
                        alignItems="flex-start"
                        justifyContent="space-between"
                        height={{ base: "90px", md: "100px" }}
                        spacing={2}
                    >
                        <Flex
                            flexDirection={{ base: "column", sm: "row" }}
                            flexWrap={{ base: "wrap", sm: "nowrap" }}
                            alignItems={{ base: "flex-start", sm: "center" }}
                            width="100%"
                        >
                            <Box
                                width={{ base: "70px", md: "80px" }}
                                height={{ base: "70px", md: "80px" }}
                                borderRadius="md"
                                overflow="hidden"
                                flexShrink={0}
                            >
                                <Image src={Image1} width="100%" height="100%" objectFit="cover" />
                            </Box>
                            <Box
                                width={{ base: "calc(100% - 80px)", sm: "auto", md: "auto" }}
                                maxWidth={{ base: "100%", sm: "40%", md: "45%" }}
                                ml={4}
                                mt={{ base: 4, sm: 0 }}
                                overflow="hidden"
                            >
                                <Text
                                    fontSize={{ base: "xs", sm: "sm", md: "md" }}
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
                                    fontSize={{ base: "2xs", sm: "xs" }}
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
                            <Box
                                borderRadius="lg"
                                minWidth={{ base: "110px", sm: "130px" }}
                                height="34px"
                                ml={{ base: 0, sm: 4 }}
                                mt={{ base: 2, sm: 0 }}
                                bg="orange.100"
                                px={3}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Text color="orange.500" whiteSpace="nowrap" fontSize={{ base: "xs", sm: "sm" }}>Reminder Sent</Text>
                            </Box>
                        </Flex>

                        {/* olny icons for mobile */}
                        <VStack
                            spacing={2}
                            flexShrink={0}
                            alignItems="center"
                            height="100%"
                            display={{ base: "flex", lg: "none" }}
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
                                <Icon as={Search_normal} boxSize={4} />
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
                                <Icon as={Search_normal} boxSize={4} />
                            </Button>
                        </VStack>

                        {/* text button for bigger screen */}
                        <HStack
                            spacing={2}
                            flexShrink={0}
                            alignItems="center"
                            height="100%"
                            display={{ base: "none", lg: "flex" }}
                        >
                            <Button
                                size="sm"
                                bg="black"
                                color="white"
                                _hover={{ bg: "gray.700" }}
                                height={{ base: "30px", md: "36px" }}
                                fontSize={{ base: "xs", md: "sm" }}
                                px={{ base: 3, md: 4 }}
                            >
                                Source
                            </Button>
                            <Button
                                size="sm"
                                bg="#6F6CF3"
                                color="white"
                                _hover={{ bg: "#5957d7" }}
                                height={{ base: "30px", md: "36px" }}
                                fontSize={{ base: "xs", md: "sm" }}
                                px={{ base: 3, md: 4 }}
                            >
                                View Details
                            </Button>
                        </HStack>
                    </HStack>
                    {[...Array(3)].map((_, index) => (
                        <ListItem key={index} />
                    ))}
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default function ProductList() {
    return (
        <LayoutWrapper>
            <MainContent />
        </LayoutWrapper>
    );
}