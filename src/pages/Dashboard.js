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
import { ReactComponent as  Linear_user} from "../icon/user.svg"
import { ReactComponent as  Search_normal} from "../icon/search-normal.svg"
import { ReactComponent as  Profile_example } from "../image/Group 35556.svg"
import { ReactComponent as  Chart_square } from "../icon/chart-square.svg"
import { ReactComponent as  Number_of_Takedowns } from "../image/Frame 35384.svg"
import { ReactComponent as  Coin } from "../icon/coin.svg"
import { ReactComponent as  Message_notif } from "../icon/message-notif.svg"
import profileImage from "../image/img.png";
import { ReactComponent as  Logout_icon } from "../icon/logout.svg";
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
                                notifications={0}
                                text="Dashboard"
                                isActive={true}
                                to = "/dashboard"
                            />
                        </GridItem>
                        <GridItem>
                            <MenuItem
                                icon={Quote}
                                notifications={0}
                                text="Reviews"
                                isActive={false}
                                to = "/dashboard/reviews/grid"
                            />
                        </GridItem>
                        <GridItem>
                            <MenuItem
                                icon={Hashtag}
                                notifications={0}
                                text="Keywords"
                                isActive={false}
                            />
                        </GridItem>
                        <GridItem>
                            <MenuItem
                                icon={Command_square}
                                notifications={0}
                                text="Web crawler"
                                isActive={false}
                            />
                        </GridItem>
                        <GridItem>
                            <MenuItem
                                icon={Notification_bing}
                                notifications={3}
                                text="Notifications"
                                isActive={false}
                            />
                        </GridItem>
                        <GridItem>
                            <MenuItem
                                icon={Setting}
                                notifications={0}
                                text="Settings"
                                isActive={false}
                            />
                        </GridItem>
                        <GridItem>
                            <MenuItem
                                icon={User}
                                notifications={0}
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
                        <Text fontSize="2xl" fontWeight="bold">Dashboard</Text>

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
                        <Text fontWeight="medium">Wed, Oct 27</Text>

                        <Flex
                            align="center"
                            flexWrap="wrap"
                            gap={2}
                        >
                            <Text fontSize="sm" mr={2}>Choose Platform:</Text>
                            <Button size="sm" variant="outline" mr={2}>Alibaba</Button>
                            <Button size="sm" variant="outline" mr={2}>AliExpress</Button>
                            <Button size="sm" colorScheme="purple">All</Button>
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 4, md: 6 }} mt={4}>
                        <Box bg="white" p={4} borderRadius="lg" boxShadow="sm">
                            <Box
                                width="100%"
                                height="140px"
                                borderRadius="16px"
                                p={3}
                                overflow="auto"
                            >
                                <Flex align="center" opacity="60%" mb={3}>
                                    <Icon as={Chart_square} mr={2} boxSize="18px" />
                                    <Text fontFamily="Inter" fontWeight={400} fontSize="14px" lineHeight="160%" color="#161819">
                                        Number of Takedowns
                                    </Text>
                                </Flex>
                                {/* eslint-disable-next-line react/jsx-pascal-case */}
                                <Number_of_Takedowns />
                                <Text fontFamily="Inter" fontWeight={400} fontSize="12px" lineHeight="160%" opacity="60%" color="#161819" mt={2}>
                                    October 2023
                                </Text>
                            </Box>
                        </Box>
                        <Box bg="white" p={4} borderRadius="lg" boxShadow="sm">
                            <Box
                                width="100%"
                                height="140px"
                                borderRadius="16px"
                                p={3}
                                overflow="auto"
                            >
                                <Flex align="center" opacity="60%" mb={3}>
                                    <Icon as={Coin} mr={2} boxSize="18px" />
                                    <Text fontFamily="Inter" fontWeight={400} fontSize="14px" lineHeight="160%" color="#161819">
                                        % of Goods Scraped
                                    </Text>
                                </Flex>
                                {/* eslint-disable-next-line react/jsx-pascal-case */}
                                <Flex>
                                    <Text fontFamily="Inter" fontWeight={600} fontSize={32} lineHeight="120%">92.85%</Text>
                                    <Box width="50px"
                                         height="24px"
                                         borderRadius="100px"
                                         bg="#EBFDEF"
                                         display="flex"
                                         justifyContent="center"
                                         alignItems="center"
                                         ml={2}
                                         mt={2}
                                    >
                                        <Flex align="center" justify="center">
                                            <Text color="#42AA65" mr={1} fontWeight={600} fontSize="10px">↑</Text>
                                            <Text
                                                fontFamily="Inter"
                                                fontWeight={600}
                                                fontSize="10px"
                                                lineHeight="100%"
                                                color="#42AA65"
                                            >
                                                20.5%
                                            </Text>
                                        </Flex>
                                    </Box>
                                </Flex>
                                <Text fontFamily="Inter" fontWeight={400} fontSize="12px" lineHeight="160%" opacity="60%" color="#161819" mt={2}>
                                    October 2023
                                </Text>
                            </Box>
                        </Box>
                        <Box bg="white" p={4} borderRadius="lg" boxShadow="sm">
                            <Box
                                width="100%"
                                height="140px"
                                borderRadius="16px"
                                p={3}
                                overflow="auto"
                            >
                                <Flex align="center" opacity="60%" mb={3}>
                                    <Icon as={Message_notif} mr={2} boxSize="18px" />
                                    <Text fontFamily="Inter" fontWeight={400} fontSize="14px" lineHeight="160%" color="#161819">
                                        New Notices
                                    </Text>
                                </Flex>

                                <Flex justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Flex>
                                            <Text fontFamily="Inter" fontWeight={600} fontSize={32} lineHeight="120%">2395</Text>
                                        </Flex>
                                        <Text fontFamily="Inter" fontWeight={400} fontSize="12px" lineHeight="160%" opacity="60%" color="#161819" mt={2}>
                                            October 2023
                                        </Text>
                                    </Box>

                                    {/* Chart area on the right side */}
                                    <Box width="200px" height="80px">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart
                                                data={[
                                                    { name: 'Jan', value: 400 },
                                                    { name: 'Feb', value: 200 },
                                                    { name: 'Mar', value: 300 },
                                                    { name: 'Apr', value: 700 },
                                                    { name: 'May', value: 1000 },
                                                    { name: 'Jun', value: 1300 },
                                                    { name: 'Jul', value: 1900 },
                                                    { name: 'Aug', value: 1800 },
                                                    { name: 'Sep', value: 2200 },
                                                    { name: 'Oct', value: 2095 }
                                                ]}
                                                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                                            >
                                                <defs>
                                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#42AA65" stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor="#42AA65" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <Area
                                                    type="monotone"
                                                    dataKey="value"
                                                    stroke="#42AA65"
                                                    strokeWidth={2}
                                                    fillOpacity={1}
                                                    fill="url(#colorValue)"
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </Box>
                                </Flex>
                            </Box>
                        </Box>
                    </SimpleGrid>
                    <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={{ base: 4, md: 6 }} mt={4}>
                        <GridItem colSpan={2}>
                            <Box
                                bg="white"
                                p={6}
                                borderRadius="lg"
                                boxShadow="sm"
                                height="310px"
                            >
                                <Box width="100%" height="100%">
                                    <Flex justifyContent="space-between" alignItems="center" mb={4}>
                                        <Text
                                            color="#000000"
                                            fontWeight="600"
                                            fontSize="20px"
                                        >
                                            Analytics
                                        </Text>

                                        <Flex alignItems="center">
                                            <Box display="inline-flex" alignItems="center" mr={4}>
                                                <Box as="span" w="8px" h="8px" borderRadius="50%" bg="#A5E8E0" mr={2}></Box>
                                                <Text fontSize="12px" fontWeight={600} color="#000000">Listings Removed</Text>
                                            </Box>

                                            <Box display="inline-flex" alignItems="center" mr={4}>
                                                <Box as="span" w="8px" h="8px" borderRadius="50%" bg="#8CD4FF" mr={2}></Box>
                                                <Text fontSize="12px" fontWeight={600} color="#000000">Notices Sent</Text>
                                            </Box>

                                            <Box display="inline-flex" alignItems="center">
                                                <Box as="span" w="8px" h="8px" borderRadius="50%" bg="#FFA5A5" mr={2}></Box>
                                                <Text fontSize="12px" fontWeight={600} color="#000000">Notices Rejected</Text>
                                            </Box>
                                        </Flex>
                                    </Flex>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={[
                                                { month: "Jan", listingsRemoved: 6000, noticesSent: 800, noticesRejected: 1000 },
                                                { month: "Feb", listingsRemoved: 5000, noticesSent: 700, noticesRejected: 900 },
                                                { month: "Mar", listingsRemoved: 5200, noticesSent: 750, noticesRejected: 850 },
                                                { month: "Apr", listingsRemoved: 4200, noticesSent: 650, noticesRejected: 800 },
                                                { month: "May", listingsRemoved: 4500, noticesSent: 600, noticesRejected: 700 },
                                                { month: "Jun", listingsRemoved: 5100, noticesSent: 700, noticesRejected: 500 },
                                                { month: "Jul", listingsRemoved: 6000, noticesSent: 800, noticesRejected: 900 },
                                                { month: "Aug", listingsRemoved: 5800, noticesSent: 750, noticesRejected: 400 },
                                                { month: "Sep", listingsRemoved: 5500, noticesSent: 700, noticesRejected: 220 },
                                                { month: "Oct", listingsRemoved: 5000, noticesSent: 650, noticesRejected: 220 },
                                                { month: "Nov", listingsRemoved: 4800, noticesSent: 600, noticesRejected: 300 },
                                                { month: "Dec", listingsRemoved: 4300, noticesSent: 550, noticesRejected: 200 }
                                            ]}
                                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                                            <XAxis
                                                dataKey="x"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#333', fontSize: 12 }}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#999', fontSize: 12 }}
                                                tickCount={7}
                                                domain={[0, 6000]}
                                            />
                                            <Tooltip />
                                            <Bar
                                                dataKey="listingsRemoved"
                                                name="Listings Removed"
                                                fill="#D7F0FC"
                                                barSize={16}
                                                radius={[4, 4, 0, 0]}
                                            />
                                            <Bar
                                                dataKey="noticesSent"
                                                name="Notices Sent"
                                                fill="#CDEFD9"
                                                barSize={16}
                                                radius={[4, 4, 0, 0]}
                                            />
                                            <Bar
                                                dataKey="noticesRejected"
                                                name="Notices Rejected"
                                                fill="#FEA4A3"
                                                barSize={16}
                                                radius={[4, 4, 0, 0]}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Box>
                            </Box>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <Box
                                bg="white"
                                p={6}
                                borderRadius="lg"
                                boxShadow="sm"
                                maxHeight="310px"
                                overflow="auto"
                            >
                                <Flex justifyContent="space-between" alignItems="center" mb={1}>
                                    <Text
                                        color="#000000"
                                        fontWeight="600"
                                        fontSize="20px"
                                    >
                                        Top 5 Fake Sellers
                                    </Text>
                                    <Text
                                        color="#000000"
                                        fontWeight="600"
                                        fontSize="14px"
                                    >
                                        View all
                                    </Text>
                                </Flex>
                                <Flex
                                    alignItems="center"
                                    justifyContent="space-between"
                                    bg="white"
                                    p={2}
                                    borderRadius="md"
                                    width="100%"
                                    maxWidth="600px"
                                >
                                    <Flex alignItems="center">
                                        <Box
                                            bg="#E4F5D1"
                                            borderRadius="full"
                                            width="32px"
                                            height="32px"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            mr={3}
                                        >
                                            <Icon as={Linear_user} color="#E4F5D1" boxSize={4} />
                                        </Box>
                                        <Box>
                                            <Text fontSize="sm" fontWeight="medium" color="#161819">Rosemeadows</Text>
                                            <Text fontSize="xs" color="#161819" opacity="50%">Company name</Text>
                                        </Box>
                                    </Flex>
                                    <Text fontSize="xs" color="#161819" opacity="50%">Listing #6345</Text>
                                </Flex>
                                <Flex
                                    alignItems="center"
                                    justifyContent="space-between"
                                    bg="white"
                                    p={2}
                                    borderRadius="md"
                                    width="100%"
                                    maxWidth="600px"
                                >
                                    <Flex alignItems="center">
                                        <Box
                                            bg="#FEE8EA"
                                            borderRadius="full"
                                            width="32px"
                                            height="32px"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            mr={3}
                                        >
                                            <Icon as={Linear_user} color="#FEE8EA" boxSize={4} />
                                        </Box>
                                        <Box>
                                            <Text fontSize="sm" fontWeight="medium" color="#161819">Madden Esparza</Text>
                                            <Text fontSize="xs" color="#161819" opacity="50%">Company name</Text>
                                        </Box>
                                    </Flex>
                                    <Text fontSize="xs" color="#161819" opacity="50%">Listing #6345</Text>
                                </Flex>
                                <Flex
                                    alignItems="center"
                                    justifyContent="space-between"
                                    bg="white"
                                    p={2}
                                    borderRadius="md"
                                    width="100%"
                                    maxWidth="600px"
                                >
                                    <Flex alignItems="center">
                                        <Box
                                            bg="#FCEEFF"
                                            borderRadius="full"
                                            width="32px"
                                            height="32px"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            mr={3}
                                        >
                                            <Icon as={Linear_user} color="#E4F5D1" boxSize={4} />
                                        </Box>
                                        <Box>
                                            <Text fontSize="sm" fontWeight="medium" color="#161819">Rose Meadows</Text>
                                            <Text fontSize="xs" color="#161819" opacity="50%">Company name</Text>
                                        </Box>
                                    </Flex>
                                    <Text fontSize="xs" color="#161819" opacity="50%">Listing #6345</Text>
                                </Flex>
                                <Flex
                                    alignItems="center"
                                    justifyContent="space-between"
                                    bg="white"
                                    p={2}
                                    borderRadius="md"
                                    width="100%"
                                    maxWidth="600px"
                                >
                                    <Flex alignItems="center">
                                        <Box
                                            bg="lightblue"
                                            borderRadius="full"
                                            width="32px"
                                            height="32px"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            mr={3}
                                        >
                                            <Icon as={Linear_user} color="#E4F5D1" boxSize={4} />
                                        </Box>
                                        <Box>
                                            <Text fontSize="sm" fontWeight="medium" color="#161819">Rose Meadows</Text>
                                            <Text fontSize="xs" color="#161819" opacity="50%">Company name</Text>
                                        </Box>
                                    </Flex>
                                    <Text fontSize="xs" color="#161819" opacity="50%">Listing #6345</Text>
                                </Flex>

                            </Box>
                        </GridItem>
                    </SimpleGrid>
                    <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={{ base: 4, md: 6 }} mt={4}>
                        <GridItem colSpan={2}>
                            <Box bg="white" height="240px" borderRadius="md">
                                <Box
                                    bg="white"
                                    p={6}
                                    borderRadius="lg"
                                    boxShadow="sm"
                                    maxHeight="310px"
                                    overflow="auto"
                                >
                                    <Flex justifyContent="space-between" alignItems="center" mb={1}>
                                        <Text
                                            color="#000000"
                                            fontWeight="600"
                                            fontSize="20px"
                                        >
                                            Notifications of Take Downs
                                        </Text>
                                        <Text
                                            color="#000000"
                                            fontWeight="600"
                                            fontSize="14px"
                                        >
                                            View all
                                        </Text>
                                    </Flex>
                                    <Flex
                                        alignItems="center"
                                        justifyContent="space-between"
                                        bg="white"
                                        p={2}
                                        borderRadius="md"
                                        width="100%"
                                    >
                                        <Flex>
                                            <Text fontStyle="Inter" fontWeight={400} fontSize="14px" lineHeight="160%" color="#161819" mr={4}>
                                                Mademoiselle 3.4fl.oz 100 ml perfume, CHANEL
                                            </Text>
                                            <Text fontStyle="Inter" fontWeight={400} fontSize="12px" lineHeight="160%" color="#161819" opacity={0.6}>
                                                https://yourproducturlgoeshere1122.com
                                            </Text>
                                        </Flex>
                                        <Text fontStyle="Inter" fontWeight={400} fontSize="12px" lineHeight="160%" color="#161819" opacity={0.6} alignItems="right">
                                            1 min ago
                                        </Text>
                                    </Flex>
                                    <Flex
                                        alignItems="center"
                                        justifyContent="space-between"
                                        bg="white"
                                        p={2}
                                        borderRadius="md"
                                        width="100%"
                                        borderTop="1px solid"
                                        borderColor="gray.200"
                                    >
                                        <Flex>
                                            <Text fontStyle="Inter" fontWeight={400} fontSize="14px" lineHeight="160%" color="#161819" mr={4}>
                                                Cigarettes Crush balls Aroma, BLUE
                                            </Text>
                                            <Text fontStyle="Inter" fontWeight={400} fontSize="12px" lineHeight="160%" color="#161819" opacity={0.6}>
                                                https://yourproducturlgoeshere1122.com
                                            </Text>
                                        </Flex>
                                        <Text fontStyle="Inter" fontWeight={400} fontSize="12px" lineHeight="160%" color="#161819" opacity={0.6} alignItems="right">
                                            2 mins ago
                                        </Text>
                                    </Flex>
                                    <Flex
                                        alignItems="center"
                                        justifyContent="space-between"
                                        bg="white"
                                        p={2}
                                        borderRadius="md"
                                        width="100%"
                                        borderTop="1px solid"
                                        borderColor="gray.200"
                                    >
                                        <Flex>
                                            <Text fontStyle="Inter" fontWeight={400} fontSize="14px" lineHeight="160%" color="#161819" mr={4}>
                                                4 PCS Herb Tobacco Spice Grinder, COMBAT
                                            </Text>
                                            <Text fontStyle="Inter" fontWeight={400} fontSize="12px" lineHeight="160%" color="#161819" opacity={0.6}>
                                                https://yourproducturlgoeshere1122.com
                                            </Text>
                                        </Flex>
                                        <Text fontStyle="Inter" fontWeight={400} fontSize="12px" lineHeight="160%" color="#161819" opacity={0.6} alignItems="right">
                                            2 mins ago
                                        </Text>
                                    </Flex>
                                    <Flex
                                        alignItems="center"
                                        justifyContent="space-between"
                                        bg="white"
                                        p={2}
                                        borderRadius="md"
                                        width="100%"
                                        borderTop="1px solid"
                                        borderColor="gray.200"
                                    >
                                        <Flex>
                                            <Text fontStyle="Inter" fontWeight={400} fontSize="14px" lineHeight="160%" color="#161819" mr={4}>
                                                Pokémon Enamel Pins Lot you can choose from
                                            </Text>
                                            <Text fontStyle="Inter" fontWeight={400} fontSize="12px" lineHeight="160%" color="#161819" opacity={0.6}>
                                                https://yourproducturlgoeshere1122.com
                                            </Text>
                                        </Flex>
                                        <Text fontStyle="Inter" fontWeight={400} fontSize="12px" lineHeight="160%" color="#161819" opacity={0.6} alignItems="right">
                                             2 mins ago
                                        </Text>
                                    </Flex>
                                </Box>
                            </Box>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <Box bg="white" height="auto">
                                <Box
                                    bg="white"
                                    p={{ base: 3, sm: 4, md: 6 }}
                                    borderRadius="lg"
                                    boxShadow="sm"
                                    height="auto"
                                    minHeight={{ base: "auto", md: "170px" }}
                                >
                                    <Flex
                                        justifyContent="space-between"
                                        alignItems="center"
                                        mb={1}
                                        flexDirection={{ base: "column", sm: "row" }}
                                        gap={{ base: 1, sm: 0 }}
                                    >
                                        <Text
                                            color="#000000"
                                            fontWeight="600"
                                            fontSize={{ base: "16px", md: "20px" }}
                                        >
                                            Top Admin
                                        </Text>
                                        <Text
                                            color="#000000"
                                            fontWeight="600"
                                            fontSize={{ base: "12px", md: "14px" }}
                                        >
                                            View all
                                        </Text>
                                    </Flex>
                                    <Flex
                                        alignItems={{ base: "center", sm: "flex-start" }}
                                        justifyContent={{ base: "center", sm: "space-between" }}
                                        width="100%"
                                        flexDirection={{ base: "column", sm: "row" }}
                                        gap={{ base: 4, sm: 2 }}
                                    >
                                        {/* Left side: Admin profile */}
                                        <VStack spacing={1} align="center">
                                            <Box
                                                width={{ base: "70px", md: "84px" }}
                                                height={{ base: "70px", md: "84px" }}
                                                borderRadius="50%"
                                                overflow="hidden"
                                                position="relative"
                                                mt={{ base: 2, md: 4 }}
                                            >
                                                <Image src={profileImage} width="100%" height="100%" objectFit="cover"/>
                                            </Box>
                                            <Text
                                                fontStyle="Inter"
                                                fontWeight={500}
                                                fontSize={{ base: "11px", md: "12px" }}
                                                lineHeight="160%"
                                                color="#161819"
                                            >
                                                Carl Meadows
                                            </Text>
                                            <Text
                                                fontStyle="Inter"
                                                fontWeight={400}
                                                fontSize={{ base: "9px", md: "10px" }}
                                                lineHeight="160%"
                                                color="#161819"
                                                opacity={0.5}
                                            >
                                                Admin
                                            </Text>
                                        </VStack>

                                        <VStack
                                            spacing={{ base: 2, md: 3 }}
                                            align={{ base: "center", sm: "flex-start" }}
                                            mt={{ base: 0, md: 4 }}
                                            width={{ base: "100%", sm: "auto" }}
                                        >
                                            <Box
                                                width={{ base: "100%", sm: "180px", md: "215px" }}
                                                height={{ base: "45px", md: "51px" }}
                                                bg="#F4F6F7"
                                                borderRadius="md"
                                                display="flex"
                                                alignItems="center"
                                                justifyContent={{ base: "center", sm: "flex-start" }}
                                                pl={{ base: 0, sm: 3 }}
                                            >
                                                <Text
                                                    fontWeight={500}
                                                    opacity={0.5}
                                                    fontSize={{ base: "10px", md: "12px" }}
                                                >
                                                    Notices Reviewed:
                                                </Text>
                                                <Text
                                                    fontWeight={600}
                                                    fontSize={{ base: "14px", md: "16px" }}
                                                    ml={4}
                                                >
                                                    23353
                                                </Text>
                                            </Box>
                                            <Box
                                                width={{ base: "100%", sm: "180px", md: "215px" }}
                                                height={{ base: "45px", md: "51px" }}
                                                bg="#6F6CF3"
                                                borderRadius="md"
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                _hover={{ bg: "#5957d7" }}
                                                cursor="pointer"
                                                transition="background 0.2s"
                                            >
                                                <Text
                                                    color="white"
                                                    fontWeight={600}
                                                    fontSize={{ base: "14px", md: "16px" }}
                                                >
                                                    View Details
                                                </Text>
                                            </Box>
                                        </VStack>
                                    </Flex>
                                </Box>
                            </Box>
                        </GridItem>
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