import LogoutBotton from "../components/LogoutBotton";
import {Avatar, Box, Button, Flex, Grid, GridItem, HStack, Icon, Image, Input, Spacer, VStack} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { ReactComponent as HomeIconSvg } from "../icon/home-2.svg";
import { ReactComponent as Quote} from "../icon/quote-down-square.svg"
import { ReactComponent as  Command_square} from "../icon/command-square.svg"
import { ReactComponent as  Hashtag} from "../icon/hashtag.svg"
import { ReactComponent as  Notification_bing} from "../icon/notification-bing.svg"
import { ReactComponent as  Setting} from "../icon/setting.svg"
import { ReactComponent as  User} from "../icon/filled_user.svg"
import { ReactComponent as  Search_normal} from "../icon/search-normal.svg"
import { ReactComponent as  Profile_example } from "../image/Group 35556.svg"
import Image1 from "../image/img_1.png";
import { ReactComponent as  Logout_icon } from "../icon/logout.svg";
import {useLocation, useNavigate} from 'react-router-dom';
import {InputGroup, InputRightElement, SearchIcon, SimpleGrid} from "@chakra-ui/icons";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

// make wrapper for navigation and header
// migrate to v3
// make components for cards
// navigation bar for mobile
// change icons into the chakraV3 way
// consistent fonts. heights. widths acccross the board
// make button hover slightly darker/lighter for all (depends on the curr background)


const MobileNav = () => {
    return (
        <Flex
            justify="space-between"
            align="center"
            p={3}
            display={{ base: "flex", md: "none" }}
            bg="white"
            boxShadow="sm"
        >
            <Text fontFamily="Urbanist" fontWeight={900} fontSize="20px">LOGO</Text>
            <Icon as={Setting} width="20px" height="20px" />
        </Flex>
    );
};

const MenuItem = ({ icon, text, isActive, to, notifications}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if(to) {
            navigate(to);
        }
    }

    return (
        <Grid
            templateColumns="24px minmax(0, 1fr) auto"
            width="100%"
            height="40px"
            borderRadius="10px"
            bg={isActive ? "#6F6FC3" : "transparent"}
            alignItems="center"
            padding="0 12px"
            gap="10px"
            _hover={{ bg: isActive ? "#6F6FC3" : "gray.100" }}
            cursor="pointer"
            onClick={handleClick}
            role={to ? "link" : "button"}
        >
            <GridItem display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                <Icon
                    as={icon}
                    width="20px"
                    height="20px"
                    color={isActive ? "white" : "#333"}
                    fill="currentColor"
                />
            </GridItem>
            <GridItem overflow="hidden">
                <Text
                    color={isActive ? "white" : "black"}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    fontSize={{ base: "sm", md: "md" }}
                >
                    {text}
                </Text>
            </GridItem>
            {notifications === 3 && (
                <GridItem>
                    <Box width="16px" height="16px" bg="red" borderRadius="50%" display="flex" justifyContent="center" alignItems="center">
                        <Text color="white"> {notifications} </Text>
                    </Box>
                </GridItem>
            )}
        </Grid>
    );
};

const SideBox = () => {
    return (
        <Box
            background="#ffffff"
            width="205px"
            height="100%"
            boxShadow="sm"
        >
            <Grid
                templateRows="auto 1fr"
                gap="20px"
                padding="30px 8px"
                height="100%"
            >
                <GridItem>
                    <Text
                        fontFamily="Urbanist"
                        fontWeight={900}
                        fontSize="28px"
                        lineHeight="140%"
                        color="#161819"
                        whiteSpace="nowrap"
                        ml={4}
                    >
                        LOGO
                    </Text>
                </GridItem>

                <GridItem>
                    <Grid gap="20px">
                        <GridItem>
                            <MenuItem
                                icon={HomeIconSvg}
                                text="Dashboard"
                                isActive={false}
                                to = "/dashboard"
                            />
                        </GridItem>
                        <GridItem>
                            <MenuItem
                                icon={Quote}
                                text="Reviews"
                                isActive={true}
                                to = "/dashboard/reviews/grid"
                            />
                        </GridItem>
                        <GridItem>
                            <MenuItem
                                icon={Hashtag}
                                text="Keywords"
                                isActive={false}
                            />
                        </GridItem>
                        <GridItem>
                            <MenuItem
                                icon={Command_square}
                                text="Web crawler"
                                isActive={false}
                            />
                        </GridItem>
                        <GridItem>
                            <MenuItem
                                icon={Notification_bing}
                                text="Notifications"
                                notifications={3}
                                isActive={false}
                            />
                        </GridItem>
                        <GridItem>
                            <MenuItem
                                icon={Setting}
                                text="Settings"
                                isActive={false}
                            />
                        </GridItem>
                        <GridItem>
                            <MenuItem
                                icon={User}
                                text="User management"
                                isActive={false}
                            />
                        </GridItem>
                    </Grid>
                </GridItem>
                <GridItem gap="290px">
                    <Flex ml={4} gap={2}>
                        <Logout_icon/>
                        <LogoutBotton/>
                    </Flex>
                </GridItem>
            </Grid>
        </Box>
    );
};

const MainContent = ({ children, to }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        if (to) {
            navigate(to);
        }
    }
    return (
        <Box
            padding={{ base: 3, sm: 4 }}
            width="100%"
            height="100vh"
            overflow="hidden"
        >
            <MobileNav />

            <Grid
                templateRows="auto auto auto 1fr"
                gap={{ base: "8px", md: "12px" }}
                height="100%"
            >
                {/* Header Section with Search and Profile */}
                <GridItem>
                    <Flex
                        justify="space-between"
                        align="center"
                        flexDirection={{ base: "column", md: "row" }}
                        gap={{ base: 2, md: 0 }}
                    >
                        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">Reviews</Text>

                        <Flex
                            align="center"
                            width={{ base: "100%", md: "auto" }}
                            flexDirection={{ base: "column", md: "row" }}
                            gap={{ base: 2, md: 3 }}
                        >
                            <InputGroup w={{ base: "100%", md: "250px", lg: "400px" }}>
                                <Input
                                    placeholder="Search"
                                    borderRadius="md"
                                    bg="white"
                                    size="sm"
                                />
                                <InputRightElement>
                                    <Icon
                                        as={Search_normal}
                                        opacity="50%"
                                        color="gray.400"
                                        boxSize="20px"
                                    />
                                </InputRightElement>
                            </InputGroup>
                            <Box display={{ base: "none", md: "block" }}>
                                <Profile_example/>
                            </Box>
                        </Flex>
                    </Flex>
                </GridItem>

                <Spacer/>

                {/* Date and Filter Section */}
                <GridItem>
                    <Flex
                        justify="space-between"
                        align="center"
                        flexDirection={{ base: "column", md: "row" }}
                        gap={{ base: 2, md: 3 }}
                    >
                        <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>Product List</Text>

                        <Flex
                            align="center"
                            flexWrap="wrap"
                            gap={1}
                        >
                            <Button
                                size="s"
                                variant="outline"
                                mr={1}
                                onClick={() => navigate('/dashboard/reviews/grid')}
                                bg={location.pathname.includes('/grid') ? "black" : "white"}
                                _hover={{ bg: "purple.50" }}
                                position="relative"
                                px={4}
                                minWidth="80px"
                                height="24px"
                            >
                                <Box
                                    position="absolute"
                                    width="70%"
                                    textAlign="center"
                                >
                                    <Text
                                        fontSize="12px"
                                        color={location.pathname.includes('/grid') ? "white" : "black"}
                                        whiteSpace="nowrap"
                                        overflow="hidden"
                                        textOverflow="ellipsis"
                                    >
                                        Grid View
                                    </Text>
                                </Box>
                            </Button>
                            <Button
                                size="s"
                                variant="outline"
                                mr={1}
                                onClick={() => navigate('/dashboard/reviews/list')}
                                bg={location.pathname.includes('/list') ? "black" : "white"}
                                _hover={{ bg: "purple.50" }}
                                position="relative"
                                px={4}
                                minWidth="80px"
                                height="24px"
                            >
                                <Box
                                    position="absolute"
                                    width="70%"
                                    textAlign="center"
                                >
                                    <Text
                                        fontSize="12px"
                                        color={location.pathname.includes('/list') ? "white" : "black"}
                                        whiteSpace="nowrap"
                                        overflow="hidden"
                                        textOverflow="ellipsis"
                                    >
                                        List View
                                    </Text>
                                </Box>
                            </Button>
                        </Flex>
                    </Flex>
                </GridItem>

                {/* Product Grid */}
                <GridItem overflow="auto" maxHeight="calc(100vh - 140px)">
                    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={{ base: 3, md: 4 }}>
                        {/* Product Card 1 - Fully Optimized */}
                        <VStack
                            bg="white"
                            p={3}
                            borderRadius="lg"
                            boxShadow="sm"
                            alignItems="flex-start"
                            justifyContent="space-between"
                            height={{ base: "280px", md: "320px", lg: "380px" }}
                            spacing={2}
                        >
                            <Box width="100%" borderRadius="xl" height="85%" overflow="hidden" position="relative">
                                <Image src={Image1} width="100%" height="100%" objectFit="cover"/>
                            </Box>
                            <Box width="100%" height="30%">
                                <Text
                                    fontSize={{ base: "xs", sm: "sm", md: "md" }}
                                    fontWeight={500}
                                    noOfLines={1}
                                    overflow="hidden"
                                    textOverflow="ellipsis"
                                    width="100%"
                                >
                                    Product title goes here
                                </Text>
                                <Text
                                    fontSize={{ base: "2xs", sm: "xs" }}
                                    fontWeight={400}
                                    opacity={0.6}
                                    noOfLines={1}
                                    overflow="hidden"
                                    textOverflow="ellipsis"
                                    width="100%"
                                >
                                    https://yourproducturlgoeshere1122.com
                                </Text>
                            </Box>
                            <Box
                                width="35%"
                                bg="purple.300"
                                borderRadius="md"
                                py={1}
                                px={2}
                            >
                                <Text
                                    color="white"
                                    fontSize={{ base: "2xs", sm: "xs" }}
                                    noOfLines={1}
                                    textAlign="center"
                                >
                                    View Details
                                </Text>
                            </Box>
                        </VStack>

                        {/* Product Card 2 - with Source Button */}
                        <VStack
                            bg="white"
                            p={3}
                            borderRadius="lg"
                            boxShadow="sm"
                            alignItems="flex-start"
                            justifyContent="space-between"
                            height={{ base: "280px", md: "320px", lg: "380px" }}
                            spacing={2}
                        >
                            <Box width="100%" borderRadius="xl" height="85%" overflow="hidden" position="relative">
                                <Image src={Image1} width="100%" height="100%" objectFit="cover"/>
                            </Box>
                            <Box width="100%" height="30%">
                                <Text
                                    fontSize={{ base: "xs", sm: "sm", md: "md" }}
                                    fontWeight={500}
                                    noOfLines={1}
                                    overflow="hidden"
                                    textOverflow="ellipsis"
                                    width="100%"
                                >
                                    Product title goes here
                                </Text>
                                <Text
                                    fontSize={{ base: "2xs", sm: "xs" }}
                                    fontWeight={400}
                                    opacity={0.6}
                                    noOfLines={1}
                                    overflow="hidden"
                                    textOverflow="ellipsis"
                                    width="100%"
                                >
                                    https://yourproducturlgoeshere1122.com
                                </Text>
                            </Box>
                            <Flex width="100%" alignItems="center" justifyContent="space-between">
                                <Box
                                    width="35%"
                                    bg="purple.300"
                                    borderRadius="md"
                                    py={1}
                                    px={2}
                                >
                                    <Text
                                        color="white"
                                        fontSize={{ base: "2xs", sm: "xs" }}
                                        noOfLines={1}
                                        textAlign="center"
                                    >
                                        View Details
                                    </Text>
                                </Box>
                                <Box
                                    width="25%"
                                    bg="black"
                                    borderRadius="md"
                                    py={1}
                                    px={2}
                                >
                                    <Text
                                        color="white"
                                        fontSize={{ base: "2xs", sm: "xs" }}
                                        noOfLines={1}
                                        textAlign="center"
                                    >
                                        Source
                                    </Text>
                                </Box>
                            </Flex>
                        </VStack>

                        {/* Product Cards 3-8 (Using the optimized format) */}
                        {[...Array(6)].map((_, index) => (
                            <VStack
                                key={index}
                                bg="white"
                                p={3}
                                borderRadius="lg"
                                boxShadow="sm"
                                alignItems="flex-start"
                                justifyContent="space-between"
                                height={{ base: "280px", md: "320px", lg: "380px" }}
                                spacing={2}
                            >
                                <Box width="100%" borderRadius="xl" height="85%" overflow="hidden" position="relative">
                                    <Image src={Image1} width="100%" height="100%" objectFit="cover"/>
                                </Box>
                                <Box width="100%" height="30%">
                                    <Text
                                        fontSize={{ base: "xs", sm: "sm", md: "md" }}
                                        fontWeight={500}
                                        noOfLines={1}
                                        overflow="hidden"
                                        textOverflow="ellipsis"
                                        width="100%"
                                    >
                                        Product title goes here
                                    </Text>
                                    <Text
                                        fontSize={{ base: "2xs", sm: "xs" }}
                                        fontWeight={400}
                                        opacity={0.6}
                                        noOfLines={1}
                                        overflow="hidden"
                                        textOverflow="ellipsis"
                                        width="100%"
                                    >
                                        https://yourproducturlgoeshere1122.com
                                    </Text>
                                </Box>
                                <Flex width="100%" alignItems="center" justifyContent="space-between">
                                    <Box
                                        width="35%"
                                        bg="purple.300"
                                        borderRadius="md"
                                        py={1}
                                        px={2}
                                    >
                                        <Text
                                            color="white"
                                            fontSize={{ base: "2xs", sm: "xs" }}
                                            noOfLines={1}
                                            textAlign="center"
                                        >
                                            View Details
                                        </Text>
                                    </Box>
                                    <Box
                                        width="25%"
                                        bg="black"
                                        borderRadius="md"
                                        py={1}
                                        px={2}
                                    >
                                        <Text
                                            color="white"
                                            fontSize={{ base: "2xs", sm: "xs" }}
                                            noOfLines={1}
                                            textAlign="center"
                                        >
                                            Source
                                        </Text>
                                    </Box>
                                </Flex>
                            </VStack>
                        ))}
                    </SimpleGrid>
                </GridItem>
            </Grid>
        </Box>
    );
};

export default function Productgrid() {
    return (
        <Grid
            templateColumns={{
                base: "1fr",
                md: "200px 1fr"
            }}
            width="100%"
            height="100vh"
            bg="#f8f4fc"
            overflow="hidden"
        >
            <GridItem display={{ base: "none", md: "block" }}>
                <SideBox />
            </GridItem>
            <GridItem overflow="hidden">
                <MainContent />
            </GridItem>
        </Grid>
    );
}