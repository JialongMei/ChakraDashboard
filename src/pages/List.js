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
                        gap={{ base: 2, md: 3}}
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
                    <SimpleGrid columns={1} spacing={{ base: 3, md: 4, lg: 6 , xl: 8 }}>
                        <HStack
                            bg="white"
                            p={3}
                            borderRadius="lg"
                            boxShadow="sm"
                            alignItems="flex-start"
                            justifyContent="space-between"
                            height={{ base: "90px", md: "100px" }}
                            spacing={2}
                        >
                            <Flex>
                                <Box width={{ base: "70px", md: "80px" }}  height={{ base: "70px", md: "80px" }} borderRadius="md" overflow="hidden" flexShrink={0}>
                                    <Image src={Image1} width="100%" height="100%" objectFit="cover"/>
                                </Box>
                                <Box width="100%" height="30%" ml={4} mt={4}>
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
                                <Box borderRadius="lg" width="95px" height="34px" ml={4} mt={6} bg="green.100" px={3}>
                                    <Text mt={1} color="green.500">Removed</Text>
                                </Box>
                            </Flex>
                            <HStack spacing={2} flexShrink={0} alignItems="center" height="100%">
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
                        <HStack
                            bg="white"
                            p={3}
                            borderRadius="lg"
                            boxShadow="sm"
                            alignItems="flex-start"
                            justifyContent="space-between"
                            height={{ base: "90px", md: "100px" }}
                            spacing={2}
                        >
                            <Flex>
                                <Box width={{ base: "70px", md: "80px" }}  height={{ base: "70px", md: "80px" }} borderRadius="md" overflow="hidden" flexShrink={0}>
                                    <Image src={Image1} width="100%" height="100%" objectFit="cover"/>
                                </Box>
                                <Box width="100%" height="30%" ml={4} mt={4}>
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
                                <Box borderRadius="lg" width="95px" height="34px" ml={4} mt={6} bg="green.100" px={3}>
                                    <Text mt={1} color="green.500">Removed</Text>
                                </Box>
                            </Flex>
                            <HStack spacing={2} flexShrink={0} alignItems="center" height="100%">
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
                        <HStack
                            bg="white"
                            p={3}
                            borderRadius="lg"
                            boxShadow="sm"
                            alignItems="flex-start"
                            justifyContent="space-between"
                            height={{ base: "90px", md: "100px" }}
                            spacing={2}
                        >
                            <Flex>
                                <Box width={{ base: "70px", md: "80px" }}  height={{ base: "70px", md: "80px" }} borderRadius="md" overflow="hidden" flexShrink={0}>
                                    <Image src={Image1} width="100%" height="100%" objectFit="cover"/>
                                </Box>
                                <Box width="100%" height="30%" ml={4} mt={4}>
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
                                <Box borderRadius="lg" width="95px" height="34px" ml={4} mt={6} bg="green.100" px={3}>
                                    <Text mt={1} color="green.500">Removed</Text>
                                </Box>
                            </Flex>
                            <HStack spacing={2} flexShrink={0} alignItems="center" height="100%">
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
                        <HStack
                            bg="white"
                            p={3}
                            borderRadius="lg"
                            boxShadow="sm"
                            alignItems="flex-start"
                            justifyContent="space-between"
                            height={{ base: "90px", md: "100px" }}
                            spacing={2}
                        >
                            <Flex>
                                <Box width={{ base: "70px", md: "80px" }}  height={{ base: "70px", md: "80px" }} borderRadius="md" overflow="hidden" flexShrink={0}>
                                    <Image src={Image1} width="100%" height="100%" objectFit="cover"/>
                                </Box>
                                <Box width="100%" height="30%" ml={4} mt={4} flex="1">
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
                                    borderRadius="lg"
                                    width="140px"
                                    height="34px"
                                    bg="orange.100"
                                    px={3}
                                    flexShrink={0}
                                    ml={4}
                                    mt={4}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Text color="orange.500">Reminder Sent</Text>
                                </Box>
                            </Flex>
                            <HStack spacing={2} flexShrink={0} alignItems="center" height="100%">
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
                        <HStack
                            bg="white"
                            p={3}
                            borderRadius="lg"
                            boxShadow="sm"
                            alignItems="flex-start"
                            justifyContent="space-between"
                            height={{ base: "90px", md: "100px" }}
                            spacing={2}
                        >
                            <Flex>
                                <Box width={{ base: "70px", md: "80px" }}  height={{ base: "70px", md: "80px" }} borderRadius="md" overflow="hidden" flexShrink={0}>
                                    <Image src={Image1} width="100%" height="100%" objectFit="cover"/>
                                </Box>
                                <Box width="100%" height="30%" ml={4} mt={4}>
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
                                <Box borderRadius="lg" width="95px" height="34px" ml={4} mt={6} bg="green.100" px={3}>
                                    <Text mt={1} color="green.500">Removed</Text>
                                </Box>
                            </Flex>
                            <HStack spacing={2} flexShrink={0} alignItems="center" height="100%">
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
                        <HStack
                            bg="white"
                            p={3}
                            borderRadius="lg"
                            boxShadow="sm"
                            alignItems="flex-start"
                            justifyContent="space-between"
                            height={{ base: "90px", md: "100px" }}
                            spacing={2}
                        >
                            <Flex>
                                <Box width={{ base: "70px", md: "80px" }}  height={{ base: "70px", md: "80px" }} borderRadius="md" overflow="hidden" flexShrink={0}>
                                    <Image src={Image1} width="100%" height="100%" objectFit="cover"/>
                                </Box>
                                <Box width="100%" height="30%" ml={4} mt={4}>
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
                                <Box borderRadius="lg" width="95px" height="34px" ml={4} mt={6} bg="green.100" px={3}>
                                    <Text mt={1} color="green.500">Removed</Text>
                                </Box>
                            </Flex>
                            <HStack spacing={2} flexShrink={0} alignItems="center" height="100%">
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