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
import { useNavigate } from 'react-router-dom';
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
            p={4}
            display={{ base: "flex", md: "none" }}
            bg="white"
            boxShadow="sm"
        >
            <Text fontFamily="Urbanist" fontWeight={900} fontSize="24px">LOGO</Text>
            <Icon as={Setting} width="24px" height="24px" />
        </Flex>
    );
};

const MenuItem = ({ icon, text, isActive, to}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if(to) {
            navigate(to);
        }
    }

    return (
        <Grid
            templateColumns="24px minmax(0, 1fr)"
            width="100%"
            height="48px"
            borderRadius="12px"
            bg={isActive ? "#6F6FC3" : "transparent"}
            alignItems="center"
            padding="0 16px"
            gap="12px"
            _hover={{ bg: isActive ? "#6F6FC3" : "gray.100" }}
            cursor="pointer"
            onClick={handleClick}
            role={to ? "link" : "button"}
        >
            <GridItem display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                <Icon
                    as={icon}
                    width="24px"
                    height="24px"
                    color={isActive ? "white" : "#333"}
                    fill="currentColor"
                />
            </GridItem>
            <GridItem overflow="hidden">
                <Text
                    color={isActive ? "white" : "black"}
                    overflow="visible"
                    whiteSpace="nowrap"
                >
                    {text}
                </Text>
            </GridItem>
        </Grid>
    );
};

const SideBox = () => {
    return (
        <Box
            background="#ffffff"
            width="225px"
            height="100%"
            boxShadow="sm"
        >
            <Grid
                templateRows="auto 1fr"
                gap="30px"
                padding="40px 10px"
                height="100%"
            >
                <GridItem>
                    <Text
                        fontFamily="Urbanist"
                        fontWeight={900}
                        fontSize="32px"
                        lineHeight="160%"
                        letterSpacing="0%"
                        color="#161819"
                        whiteSpace="nowrap"
                    >
                        LOGO
                    </Text>
                </GridItem>

                <GridItem>
                    <Grid gap="12px">
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
                                to = "/dashboard/reviews/Grid"
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
            </Grid>
        </Box>
    );
};

const MainContent = ({ children }) => {
    return (
        <Box
            padding={{ base: 4, md: 6 }}
            width="100%"
            height="100vh"
            overflow="auto"
        >
            <MobileNav /> {/* Add mobile nav */}

            <Grid
                templateRows="auto auto auto 1fr"
                gap={{ base: "12px", md: "20px" }}
                height="auto"
            >
                {/* Header Section with Search and Profile */}
                <GridItem>
                    <Flex
                        justify="space-between"
                        align="center"
                        flexDirection={{ base: "column", lg: "row" }}
                        gap={{ base: 4, lg: 0 }}
                    >
                        <Text fontSize="2xl" fontWeight="bold">Reviews</Text>

                        <Flex
                            align="center"
                            width={{ base: "100%", lg: "auto" }}
                            flexDirection={{ base: "column", md: "row" }}
                            gap={4}
                        >
                            <InputGroup w={{ base: "100%", md: "300px", lg: "550px" }}>
                                <Input
                                    placeholder="Search"
                                    borderRadius="md"
                                    bg="white"
                                />
                                <InputRightElement>
                                    <Icon
                                        as={Search_normal}
                                        opacity="50%"
                                        color="gray.400"
                                        boxSize="24px"
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
                        gap={4}
                    >
                        <Text fontWeight="medium">Product List</Text>

                        <Flex
                            align="center"
                            flexWrap="wrap"
                            gap={2}
                        >
                            <Button size="sm" variant="outline" mr={2}>Grid View</Button>
                            <Button size="sm" variant="outline" mr={2}>List View</Button>
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 4, md: 6 }} mt={4}>
                        <VStack
                            bg="white"
                            p={4}
                            borderRadius="xl"
                            boxShadow="sm"
                            alignItems="flex-start"
                            justifyContent="center"
                            display="flex"
                            height="40vh"
                            spacing={3}
                        >
                            <Box width="100%" borderRadius="3xl" height="65%" overflow="hidden" position="relative">
                                <Image src={Image1} width="100%" height="100%" objectFit="cover"/>
                            </Box>
                            <Box width="100%" height="25%">
                                <Text mt={2} mb={2} fontWeight={500} fontSize="16px">
                                    Product title goes here
                                </Text>
                                <Text fontSize="12px" fontWeight={400} opacity={0.6}>https://yourproducturlgoeshere1122.com</Text>
                            </Box>
                            <Box width="30%" height="10%" bg="purple.300" borderRadius="lg" alignItems="center">
                                <Text ml={1}>View Details</Text>
                            </Box>
                        </VStack>
                    </SimpleGrid>
                </GridItem>
            </Grid>
        </Box>
    );
};

export default function Dashboard() {
    return (
        <Grid
            templateColumns={{
                base: "1fr",
                md: "220px 1fr"
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