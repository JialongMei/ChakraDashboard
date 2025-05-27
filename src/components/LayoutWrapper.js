import Logoutbutton from "../components/LogoutButton";
import {Avatar, Box, Button, Flex, Grid, GridItem, HStack, Image, Input, Spacer, VStack} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { ReactComponent as HomeIconSvg } from "../icon/home-2.svg";
import { ReactComponent as Quote} from "../icon/quote-down-square.svg"
import { ReactComponent as Command_square} from "../icon/command-square.svg"
import { ReactComponent as Hashtag} from "../icon/hashtag.svg"
import { ReactComponent as Notification_bing} from "../icon/notification-bing.svg"
import { ReactComponent as Setting} from "../icon/setting.svg"
import { ReactComponent as User} from "../icon/filled_user.svg"
import { ReactComponent as Linear_user} from "../icon/user.svg"
import { ReactComponent as Goods_scraped} from "../image/Frame 35563.svg"
import { ReactComponent as Profile_example } from "../image/Group 35556.svg"
import { ReactComponent as Chart_square } from "../icon/chart-square.svg"
import { ReactComponent as Number_of_Takedowns } from "../image/Frame 35384.svg"
import { ReactComponent as Coin } from "../icon/coin.svg"
import { ReactComponent as Message_notif } from "../icon/message-notif.svg"
import { ReactComponent as Notices_num } from "../image/2395.svg"
import profileImage from "../image/Group 35556.svg";
import { ReactComponent as Logout_icon } from "../icon/logout.svg";
import { useNavigate, useLocation } from 'react-router-dom';
import {InputGroup, InputElement, SimpleGrid} from "@chakra-ui/react";
import { Icon, createIcon } from "@chakra-ui/react";
import Card from "../components/Card";
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
import {useState} from "react";

const SearchIcon = createIcon({
    displayName: "SearchIcon",
    viewBox: "0 0 24 24",
    defaultProps: {
        color: "gray",
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

const MenuItem = ({ icon, text, isActive, to, notifications }) => {
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
                    fill={isActive ? "white" : "black"}
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
            {notifications !== 0 && (
                <GridItem>
                    <Box width="16px" height="16px" bg="red" borderRadius="50%" display="flex" justifyContent="center" alignItems="center">
                        <Text color="white" fontSize="12px"> {notifications} </Text>
                    </Box>
                </GridItem>
            )}
        </Grid>
    );
};

const SideBox = () => {
    const location = useLocation();

    const isDashboard = location.pathname === "/dashboard" || location.pathname === "/dashboard/";
    const isReviews = location.pathname.includes("/dashboard/reviews");
    const isKeywords = location.pathname.includes("/dashboard/keywords");
    const isWebCrawler = location.pathname.includes("/dashboard/webcrawler");
    const isNotifications = location.pathname.includes("/dashboard/notifications");
    const isSettings = location.pathname.includes("/dashboard/settings");
    const isUserManagement = location.pathname.includes("/user-management");
    const isToDoList = location.pathname.includes("/dashboard/todolist");

    return (
        <Box
            bg="#ffffff"
            width="230px"
            // height="100%"
            position="fixed"
            bottom={0}
            top={0}
            overflow="hidden"
            _hover={{
                overflow: "auto",
            }}
            css={{
                '&::-webkit-scrollbar': {
                    width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                    background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#CBD5E0',
                    borderRadius: '3px',
                },
                scrollbarWidth: 'thin',
                scrollbarColor: '#CBD5E0 transparent',
            }}
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
                                notifications={0}
                                text="Dashboard"
                                isActive={isDashboard}
                                to="/dashboard"
                            />
                        </GridItem>
                        <GridItem>
                            <MenuItem
                                icon={Quote}
                                notifications={0}
                                text="Reviews"
                                isActive={isReviews}
                                to="/dashboard/reviews/grid"
                            />
                        </GridItem>
                        <GridItem>
                            <MenuItem
                                icon={Hashtag}
                                notifications={0}
                                text="Keywords"
                                isActive={isKeywords}
                                to="/dashboard/keywords"
                            />
                        </GridItem>
                        <GridItem>
                            <MenuItem
                                icon={Command_square}
                                notifications={0}
                                text="Web crawler"
                                isActive={isWebCrawler}
                                to="/dashboard/webcrawler"
                            />
                        </GridItem>
                        <GridItem>
                            <MenuItem
                                icon={Notification_bing}
                                notifications={3}
                                text="Notifications"
                                isActive={isNotifications}
                                to="/dashboard/notifications"
                            />
                        </GridItem>
                        <GridItem>
                            <MenuItem
                                icon={Setting}
                                notifications={0}
                                text="Settings"
                                isActive={isSettings}
                                to="/dashboard/settings"
                            />
                        </GridItem>
                        <GridItem>
                            <MenuItem
                                icon={User}
                                notifications={0}
                                text="User management"
                                isActive={isUserManagement}
                                to="/user-management"
                            />
                        </GridItem>
                        <GridItem>
                            <MenuItem
                                icon={User}
                                notifications={0}
                                text="To-do List"
                                isActive={isToDoList}
                                to="/dashboard/todolist"
                            />
                        </GridItem>
                    </Grid>
                </GridItem>
                <GridItem gap="290px">
                    <Flex ml={4} gap={2}>
                        <Logout_icon/>
                        <Logoutbutton/>
                    </Flex>
                </GridItem>
            </Grid>
        </Box>
    );
};

const MobileNav = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <Flex
                justify="space-between"
                align="center"
                p={4}
                display={{ base: "flex", md: "none" }}
                bg="white"
                position="relative"
                zIndex="dropdown"
            >
                <Icon
                    as={Setting}
                    width="24px"
                    height="24px"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    cursor="pointer"
                />
                <Text
                    fontFamily="Urbanist"
                    fontWeight={900}
                    fontSize="24px"
                    color='black'
                    position="absolute"
                    left="50%"
                    transform="translateX(-50%)"
                >
                    LOGO
                </Text>
            </Flex>

            {isSidebarOpen && (
                <Box
                    position="fixed"
                    top="0"
                    left="0"
                    width="100%"
                    height="100vh"
                    bg="rgba(0,0,0,0.5)"
                    zIndex="overlay"
                    onClick={() => setIsSidebarOpen(false)}
                >
                    <Box
                        position="absolute"
                        top="0"
                        left="0"
                        width="75%"
                        maxWidth="300px"
                        height="100vh"
                        bg="white"
                        overflowY="auto"
                        onClick={(e) => e.stopPropagation()}
                        boxShadow="xl"
                        animation="slideIn 0.3s ease-out"
                    >
                        <SideBox />
                    </Box>
                </Box>
            )}
        </>
    );
};

const PageHeader = ({ title }) => {
    return (
        <Flex
            justify="space-between"
            align="center"
            flexDirection={{ base: "column", lg: "row" }}
            gap={{ base: 4, lg: 0 }}
        >
            <Text fontSize="2xl" fontWeight="bold" color="black">{title}</Text>

            <Flex
                align="center"
                width={{ base: "100%", lg: "auto" }}
                flexDirection={{ base: "column", md: "row" }}
                gap={4}
                justify={{ base: "flex-start", md: "flex-end" }}
                ml="auto"
            >
                <InputGroup w={{ base: "100%", md: "250px", lg: "400px" }}>
                    <Box position="relative" width="100%">
                        <Input
                            placeholder="Search"
                            borderRadius="md"
                            bg="white"
                            size="sm"
                            color="black"
                            paddingRight="40px"
                            outline="none"
                            border="none"
                        />
                        <Box
                            position="absolute"
                            right="12px"
                            top="50%"
                            transform="translateY(-50%)"
                            pointerEvents="none"
                        >
                            <SearchIcon
                                boxSize="24px"
                                mb={0.5}
                            />
                        </Box>
                    </Box>
                </InputGroup>
                <Box display={{ base: "none", md: "block" }}>
                    <Image src={profileImage}/>
                </Box>
            </Flex>
        </Flex>
    );
};

const LayoutWrapper = ({ children, pageTitle = "Dashboard" }) => {
    const location = useLocation();
    let dynamicTitle = pageTitle;

    if (location.pathname === "/dashboard" || location.pathname === "/dashboard/") {
        dynamicTitle = "Dashboard";
    } else if (location.pathname.includes("/dashboard/reviews")) {
        dynamicTitle = "Reviews";
    } else if (location.pathname.includes("/dashboard/keywords")) {
        dynamicTitle = "Keywords";
    } else if (location.pathname.includes("/dashboard/webcrawler")) {
        dynamicTitle = "Web Crawler";
    } else if (location.pathname.includes("/dashboard/notifications")) {
        dynamicTitle = "Notifications";
    } else if (location.pathname.includes("/dashboard/settings")) {
        dynamicTitle = "Settings";
    } else if (location.pathname.includes("/dashboard/users")) {
        dynamicTitle = "User Management";
    } else if (location.pathname.includes("/dashboard/todolist")) {
        dynamicTitle = "To-do List";
    }

    return (
        <Grid
            templateColumns={{
                base: "1fr",
                md: "220px 1fr"
            }}
            width="100%"
            height="100vh"
            bg="#f8f4fc"
            overflow="auto" // Changed from hidden to auto
        >
            <GridItem display={{ base: "none", md: "block" }}>
                <SideBox />
            </GridItem>

            <GridItem overflow="auto">
                <Box
                    padding={{ base: 4, md: 6 }}
                    width="100%"
                    height="100%" // Changed from 100vh to 100%
                    overflow="auto" // Always auto instead of hidden with hover
                    css={{
                        '&::-webkit-scrollbar': {
                            width: '6px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: 'transparent',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#CBD5E0',
                            borderRadius: '3px',
                        },
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#CBD5E0 transparent',
                    }}
                >
                    <MobileNav />

                    <Grid
                        templateRows="auto 1fr"
                        gap={{ base: "12px", md: "20px" }}
                        height="auto" // Changed from 100% to auto
                    >
                        <GridItem>
                            <PageHeader title={dynamicTitle} />
                        </GridItem>

                        <GridItem>
                            {children}
                        </GridItem>
                    </Grid>
                </Box>
            </GridItem>
        </Grid>
    );
};

export default LayoutWrapper;