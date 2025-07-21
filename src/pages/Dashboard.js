import LayoutWrapper from "../components/LayoutWrapper";
import Logoutbutton from "../components/LogoutButton";
import ShakeIndicator from "../components/ShakeIndicator";
import useShakeLogout from "../hooks/useShakeLogout";
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
import profileImage from "../image/img.png";
import { ReactComponent as Logout_icon } from "../icon/logout.svg";
import { useNavigate } from 'react-router-dom';
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

const UserIcon = createIcon({
    displayName: "UserIcon",
    viewBox: "0 0 20 20",
    path: (
        <>
            <path
                d="M9.99999 9.99996C12.3012 9.99996 14.1667 8.13448 14.1667 5.83329C14.1667 3.53211 12.3012 1.66663 9.99999 1.66663C7.69881 1.66663 5.83333 3.53211 5.83333 5.83329C5.83333 8.13448 7.69881 9.99996 9.99999 9.99996Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            <path
                d="M17.1583 18.3333C17.1583 15.1083 13.95 12.5 10 12.5C6.05001 12.5 2.84167 15.1083 2.84167 18.3333"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </>
    ),
});

const MainContent = () => {
    return (
        <Box>
            {/* date and filter */}
            <Flex
                justify="space-between"
                align="center"
                flexDirection={{ base: "column", md: "row" }}
                gap={4}
                mb={4}
            >
                <Text fontWeight="medium" color="black">Wed, Oct 27</Text>

                <Flex
                    align="center"
                    flexWrap="wrap"
                    gap={2}
                >
                    <Text fontSize="sm" mr={2} color="black" opacity={0.6}>Choose Platform:</Text>
                    <Button size="sm" mr={2} color="black" _hover={{ bg: "gray.100" }} borderRadius="10px">Alibaba</Button>
                    <Button size="sm" mr={2} color="black" _hover={{ bg: "gray.100" }} borderRadius="10px">AliExpress</Button>
                    <Button size="sm" bg="#6F6CF3" color="white" _hover={{ bg: "purple" }} borderRadius="10px">All</Button>
                </Flex>
            </Flex>

            {/* cards */}
            <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                gap={{ base: 4, md: 6 }}
                mt={{ base: 0, md: 2 }}
                px={{ base: 2, md: 0 }}
            >
                <Box bg="white" p={{ base: 3, md: 4 }} borderRadius="24px">
                    <Box
                        width="100%"
                        height="auto"
                        borderRadius="16px"
                        p={{ base: 2, md: 3 }}
                    >
                        <Flex
                            align="center"
                            opacity="60%"
                            mb={{ base: 2, md: 3 }}
                            flexWrap="wrap"
                        >
                            <Icon as={Chart_square} mr={2} boxSize={{ base: "16px", md: "18px" }} />
                            <Text
                                fontWeight={400}
                                fontSize={{ base: "12px", md: "14px" }}
                                lineHeight="160%"
                                color="#161819"
                            >
                                Number of Takedowns
                            </Text>
                        </Flex>

                        <Box width="100%" maxHeight={{ base: "60px", md: "80px" }}>
                            <Number_of_Takedowns style={{ maxWidth: '100%', height: 'auto' }} />
                        </Box>

                        <Text
                            fontWeight={400}
                            fontSize={{ base: "10px", md: "12px" }}
                            lineHeight="160%"
                            opacity="60%"
                            color="#161819"
                            mt={2}
                        >
                            October 2023
                        </Text>
                    </Box>
                </Box>
                <Box bg="white" p={{ base: 3, md: 4 }} borderRadius="24px">
                    <Box
                        width="100%"
                        height="auto"
                        borderRadius="16px"
                        p={{ base: 2, md: 3 }}
                    >
                        <Flex
                            align="center"
                            opacity="60%"
                            mb={{ base: 2, md: 3 }}
                            flexWrap="wrap"
                        >
                            <Icon as={Coin} mr={2} boxSize={{ base: "16px", md: "18px" }} />
                            <Text
                                fontWeight={400}
                                fontSize={{ base: "12px", md: "14px" }}
                                lineHeight="160%"
                                color="#161819"
                            >
                                % of Goods Scraped
                            </Text>
                        </Flex>

                        <Box width="100%" maxHeight={{ base: "60px", md: "80px" }}>
                            <Goods_scraped style={{ maxWidth: '100%', height: 'auto' }} />
                        </Box>

                        <Text
                            fontWeight={400}
                            fontSize={{ base: "10px", md: "12px" }}
                            lineHeight="160%"
                            opacity="60%"
                            color="#161819"
                            mt={2}
                        >
                            October 2023
                        </Text>
                    </Box>
                </Box>
                <Box bg="white" p={{ base: 3, md: 4 }} borderRadius="24px">
                    <Box
                        width="100%"
                        height="auto"
                        borderRadius="16px"
                        p={{ base: 2, md: 3 }}
                    >
                        <Flex
                            align="center"
                            opacity="60%"
                            mb={{ base: 2, md: 3 }}
                            flexWrap="wrap"
                        >
                            <Icon as={Message_notif} mr={2} boxSize={{ base: "16px", md: "18px" }} />
                            <Text
                                fontWeight={400}
                                fontSize={{ base: "12px", md: "14px" }}
                                lineHeight="160%"
                                color="#161819"
                            >
                                New Notices
                            </Text>
                        </Flex>

                        <Flex
                            justifyContent="space-between"
                            alignItems={{ base: "flex-start", md: "center" }}
                            flexDirection={{ base: "column", sm: "row" }}
                            gap={{ base: 3, sm: 0 }}
                        >
                            <Box>
                                <Box width="100%"  maxHeight={{ base: "60px", md: "80px" }}>
                                    <Notices_num  style={{ maxWidth: '100%', height: 'auto' }} />
                                </Box>
                                <Text
                                    fontWeight={400}
                                    fontSize={{ base: "10px", md: "12px" }}
                                    lineHeight="160%"
                                    opacity="60%"
                                    color="#161819"
                                    mt={{ base: 1, md: 2 }}
                                >
                                    October 2023
                                </Text>
                            </Box>

                            <Box
                                width={{ base: "100%", sm: "150px", md: "200px" }}
                                height={{ base: "60px", sm: "70px", md: "80px" }}
                            >
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
            <SimpleGrid columns={{ base: 1, lg: 3 }} gap={{ base: 4, md: 6 }} mt={{ base: 4, md: 6 }}>
                <GridItem colSpan={{ base: 1, lg: 2 }}>
                    <Box
                        bg="white"
                        p={{ base: 1, sm: 2, md: 4 }}
                        borderRadius="24px"
                        height={{ base: "auto", md: "310px" }}
                        minHeight={{ base: "250px", md: "310px" }}
                    >
                        <Box width="100%" height="100%">
                            <Flex
                                justifyContent="space-between"
                                alignItems={{ base: "flex-start", sm: "center" }}
                                flexDirection={{ base: "column", sm: "row" }}
                                gap={{ base: 3, sm: 0 }}
                                mb={{ base: 3, md: 4 }}
                            >
                                <Text
                                    color="#000000"
                                    fontWeight="600"
                                    fontSize={{ base: "16px", md: "20px" }}
                                >
                                    Analytics
                                </Text>

                                <Flex
                                    alignItems={{ base: "flex-start", sm: "center" }}
                                    flexDirection={{ base: "column", sm: "row" }}
                                    gap={{ base: 2, sm: 0 }}
                                    flexWrap={{ base: "nowrap", md: "wrap" }}
                                >
                                    <Box display="inline-flex" alignItems="center" mr={{ base: 0, sm: 4 }} mb={{ base: 1, sm: 0 }}>
                                        <Box as="span" w="8px" h="8px" borderRadius="50%" bg="#D7F0FC" mr={2}></Box>
                                        <Text fontSize={{ base: "10px", md: "12px" }} fontWeight={600} color="#000000">Listings Removed</Text>
                                    </Box>

                                    <Box display="inline-flex" alignItems="center" mr={{ base: 0, sm: 4 }} mb={{ base: 1, sm: 0 }}>
                                        <Box as="span" w="8px" h="8px" borderRadius="50%" bg="#CDEFD9" mr={2}></Box>
                                        <Text fontSize={{ base: "10px", md: "12px" }} fontWeight={600} color="#000000">Notices Sent</Text>
                                    </Box>

                                    <Box display="inline-flex" alignItems="center">
                                        <Box as="span" w="8px" h="8px" borderRadius="50%" bg="#FEA4A3" mr={2}></Box>
                                        <Text fontSize={{ base: "10px", md: "12px" }} fontWeight={600} color="#000000">Notices Rejected</Text>
                                    </Box>
                                </Flex>
                            </Flex>
                            <Box height={{ base: "200px", sm: "220px", md: "240px" }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={[
                                            { month: "Jan", listingsRemoved: 6000, noticesSent: 800, noticesRejected: 1000 },
                                            { month: "Feb", listingsRemoved: 5000, noticesSent: 700, noticesRejected: 900 },
                                            { month: "Mar", listingsRemoved: 5200, noticesSent: 750, noticesRejected: 850 },
                                            { month: "Apr", listingsRemoved: 4200, noticesSent: 650, noticesRejected: 800 },
                                            { month: "May", listingsRemoved: 5000, noticesSent: 600, noticesRejected: 700 },
                                            { month: "Jun", listingsRemoved: 5100, noticesSent: 700, noticesRejected: 500 },
                                            { month: "Jul", listingsRemoved: 6000, noticesSent: 800, noticesRejected: 900 },
                                            { month: "Aug", listingsRemoved: 5800, noticesSent: 750, noticesRejected: 400 },
                                            { month: "Sep", listingsRemoved: 5500, noticesSent: 700, noticesRejected: 220 },
                                            { month: "Oct", listingsRemoved: 5000, noticesSent: 650, noticesRejected: 220 },
                                            { month: "Nov", listingsRemoved: 4800, noticesSent: 600, noticesRejected: 300 },
                                            { month: "Dec", listingsRemoved: 4300, noticesSent: 550, noticesRejected: 200 }
                                        ]}
                                        margin={{
                                            top: 20,
                                            right: 10,
                                            left: 20,
                                            bottom: 20
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                                        <XAxis
                                            dataKey="month"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#333', fontSize: 10 }}
                                            height={30}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: "14px", fill: "#999" }}
                                            tickCount={7}
                                            domain={[0, 6000]}
                                            width={30}
                                            interval={0}
                                            tickFormatter={(value) => {
                                                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                            }}
                                        />
                                        <Tooltip />
                                        <Bar
                                            dataKey="listingsRemoved"
                                            name="Listings Removed"
                                            fill="#D7F0FC"
                                            barSize={6}
                                        />
                                        <Bar
                                            dataKey="noticesSent"
                                            name="Notices Sent"
                                            fill="#CDEFD9"
                                            barSize={6}
                                        />
                                        <Bar
                                            dataKey="noticesRejected"
                                            name="Notices Rejected"
                                            fill="#FEA4A3"
                                            barSize={6}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </Box>
                    </Box>
                </GridItem>
                <GridItem colSpan={{ base: 1, lg: 1 }}>
                    <Box
                        bg="white"
                        p={{ base: 1, sm: 2, md: 4 }}
                        borderRadius="24px"
                        height={{ base: "auto", md: "310px" }}
                        overflow="hidden"
                        _hover={{
                            overflowY: "auto"
                        }}
                        css={{
                            '&::-webkit-scrollbar': {
                                width: '4px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: 'rgba(0,0,0,0.2)',
                                borderRadius: '2px',
                            },
                        }}
                    >
                        {/* Modified header with consistent padding */}
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                            mb={2}
                            px="24px" /* 24px left and right padding */
                        >
                            <Text
                                color="#000000"
                                fontWeight="600"
                                fontSize={{ base: "16px", md: "20px" }}
                            >
                                Top 5 Fake Sellers
                            </Text>
                            <Text
                                color="#000000"
                                fontWeight="600"
                                fontSize={{ base: "12px", md: "14px" }}
                            >
                                View all
                            </Text>
                        </Flex>

                        {/* Content area with left padding of 24px */}
                        <Box pl={6} pr={6}> {/* 24px left padding */}
                            {/* First seller */}
                            <Flex
                                alignItems="center"
                                justifyContent="space-between"
                                bg="white"
                                p={1}
                                borderRadius="md"
                                width="100%"
                                flexWrap="wrap"
                                mb={1}
                            >
                                <Flex
                                    alignItems="center"
                                    mb={{ base: 1, sm: 0 }}
                                    flex={{ base: "1 0 100%", sm: "1" }}
                                >
                                    <Box
                                        bg="#E4F5D1"
                                        borderRadius="10px"
                                        width={{ base: "28px", md: "36px" }}
                                        height={{ base: "28px", md: "36px" }}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        mr={3}
                                        flexShrink={0}
                                    >
                                        <UserIcon color="#85BA49" boxSize={{ base: 3, md: 4 }} />
                                    </Box>
                                    <Box minWidth="0">
                                        <Text
                                            fontSize={{ base: "10px", md: "12px" }}
                                            fontWeight="medium"
                                            color="#161819"
                                            isTruncated
                                        >
                                            Rose Meadows
                                        </Text>
                                        <Text
                                            fontSize={{ base: "10px", md: "12px" }}
                                            color="#161819"
                                            opacity="50%"
                                            isTruncated
                                        >
                                            Company name
                                        </Text>
                                    </Box>
                                </Flex>
                                <Text
                                    fontSize={{ base: "10px", md: "12px" }}
                                    color="#161819"
                                    opacity="50%"
                                    ml={{ base: 0, sm: 2 }}
                                    flexShrink={0}
                                >
                                    Listing #6345
                                </Text>
                            </Flex>

                            {/* Second seller */}
                            <Flex
                                alignItems="center"
                                justifyContent="space-between"
                                bg="white"
                                p={1}
                                borderRadius="md"
                                width="100%"
                                flexWrap="wrap"
                                mb={1}
                            >
                                <Flex
                                    alignItems="center"
                                    mb={{ base: 1, sm: 0 }}
                                    flex={{ base: "1 0 100%", sm: "1" }}
                                >
                                    <Box
                                        bg="#FEE8EA"
                                        borderRadius="10px"
                                        width={{ base: "28px", md: "36px" }}
                                        height={{ base: "28px", md: "36px" }}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        mr={3}
                                        flexShrink={0}
                                    >
                                        <UserIcon color="#DA3F51" boxSize={{ base: 3, md: 4 }} />
                                    </Box>
                                    <Box minWidth="0">
                                        <Text
                                            fontSize={{ base: "10px", md: "12px" }}
                                            fontWeight="medium"
                                            color="#161819"
                                            isTruncated
                                        >
                                            Madden Esparza
                                        </Text>
                                        <Text
                                            fontSize={{ base: "10px", md: "12px" }}
                                            color="#161819"
                                            opacity="50%"
                                            isTruncated
                                        >
                                            Company name
                                        </Text>
                                    </Box>
                                </Flex>
                                <Text
                                    fontSize={{ base: "10px", md: "12px" }}
                                    color="#161819"
                                    opacity="50%"
                                    ml={{ base: 0, sm: 2 }}
                                    flexShrink={0}
                                >
                                    Listing #6345
                                </Text>
                            </Flex>

                            {/* Third seller */}
                            <Flex
                                alignItems="center"
                                justifyContent="space-between"
                                bg="white"
                                p={1}
                                borderRadius="md"
                                width="100%"
                                flexWrap="wrap"
                                mb={1}
                            >
                                <Flex
                                    alignItems="center"
                                    mb={{ base: 1, sm: 0 }}
                                    flex={{ base: "1 0 100%", sm: "1" }}
                                >
                                    <Box
                                        bg="#FCEEFF"
                                        borderRadius="10px"
                                        width={{ base: "28px", md: "36px" }}
                                        height={{ base: "28px", md: "36px" }}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        mr={3}
                                        flexShrink={0}
                                    >
                                        <UserIcon color="#C84EE1" boxSize={{ base: 3, md: 4 }} />
                                    </Box>
                                    <Box minWidth="0">
                                        <Text
                                            fontSize={{ base: "10px", md: "12px" }}
                                            fontWeight="medium"
                                            color="#161819"
                                            isTruncated
                                        >
                                            Rose Meadows
                                        </Text>
                                        <Text
                                            fontSize={{ base: "10px", md: "12px" }}
                                            color="#161819"
                                            opacity="50%"
                                            isTruncated
                                        >
                                            Company name
                                        </Text>
                                    </Box>
                                </Flex>
                                <Text
                                    fontSize={{ base: "10px", md: "12px" }}
                                    color="#161819"
                                    opacity="50%"
                                    ml={{ base: 0, sm: 2 }}
                                    flexShrink={0}
                                >
                                    Listing #6345
                                </Text>
                            </Flex>

                            {/* Fourth seller */}
                            <Flex
                                alignItems="center"
                                justifyContent="space-between"
                                bg="white"
                                p={1}
                                borderRadius="md"
                                width="100%"
                                flexWrap="wrap"
                                mb={1}
                            >
                                <Flex
                                    alignItems="center"
                                    mb={{ base: 1, sm: 0 }}
                                    flex={{ base: "1 0 100%", sm: "1" }}
                                >
                                    <Box
                                        bg="#EBEFFB"
                                        borderRadius="10px"
                                        width={{ base: "28px", md: "36px" }}
                                        height={{ base: "28px", md: "36px" }}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        mr={3}
                                        flexShrink={0}
                                    >
                                        <UserIcon color="#395CCB" boxSize={{ base: 3, md: 4 }} />
                                    </Box>
                                    <Box minWidth="0">
                                        <Text
                                            fontSize={{ base: "10px", md: "12px" }}
                                            fontWeight="medium"
                                            color="#161819"
                                            isTruncated
                                        >
                                            Rose Meadows
                                        </Text>
                                        <Text
                                            fontSize={{ base: "10px", md: "12px" }}
                                            color="#161819"
                                            opacity="50%"
                                            isTruncated
                                        >
                                            Company name
                                        </Text>
                                    </Box>
                                </Flex>
                                <Text
                                    fontSize={{ base: "10px", md: "12px" }}
                                    color="#161819"
                                    opacity="50%"
                                    ml={{ base: 0, sm: 2 }}
                                    flexShrink={0}
                                >
                                    Listing #6345
                                </Text>
                            </Flex>

                            <Flex
                                alignItems="center"
                                justifyContent="space-between"
                                bg="white"
                                p={1}
                                borderRadius="md"
                                width="100%"
                                flexWrap="wrap"
                                mb={1}
                            >
                                <Flex
                                    alignItems="center"
                                    mb={{ base: 1, sm: 0 }}
                                    flex={{ base: "1 0 100%", sm: "1" }}
                                >
                                    <Box
                                        bg="#F8F1E7"
                                        borderRadius="10px"
                                        width={{ base: "28px", md: "36px" }}
                                        height={{ base: "28px", md: "36px" }}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        mr={3}
                                        flexShrink={0}
                                    >
                                        <UserIcon color="#BB9021" boxSize={{ base: 3, md: 4 }} />
                                    </Box>
                                    <Box minWidth="0">
                                        <Text
                                            fontSize={{ base: "10px", md: "12px" }}
                                            fontWeight="medium"
                                            color="#161819"
                                            isTruncated
                                        >
                                            Rose Meadows
                                        </Text>
                                        <Text
                                            fontSize={{ base: "10px", md: "12px" }}
                                            color="#161819"
                                            opacity="50%"
                                            isTruncated
                                        >
                                            Company name
                                        </Text>
                                    </Box>
                                </Flex>
                                <Text
                                    fontSize={{ base: "10px", md: "12px" }}
                                    color="#161819"
                                    opacity="50%"
                                    ml={{ base: 0, sm: 2 }}
                                    flexShrink={0}
                                >
                                    Listing #6345
                                </Text>
                            </Flex>
                        </Box>
                    </Box>
                </GridItem>
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, lg: 3 }} gap={{ base: 4, md: 6 }} mt={{ base: 4, md: 6 }}>
                <GridItem colSpan={{ base: 1, lg: 2 }}>
                    <Box
                        bg="white"
                        p={{ base: 1, sm: 2, md: 4 }}
                        borderRadius="24px"
                        height="100%"
                    >
                        <Box width="100%" height="100%">
                            <Flex
                                justifyContent="space-between"
                                alignItems={{ base: "flex-start", sm: "center" }}
                                flexDirection={{ base: "column", sm: "row" }}
                                gap={{ base: 3, sm: 0 }}
                                mb={{ base: 3, md: 4 }}
                            >
                                <Text
                                    color="#000000"
                                    fontWeight="600"
                                    fontSize={{ base: "16px", md: "20px" }}
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
                            {/* Notifications content - kept the same */}
                            <Flex
                                alignItems={{ base: "flex-start", md: "center" }}
                                justifyContent="space-between"
                                flexDirection={{ base: "column", sm: "row" }}
                                bg="white"
                                p={2}
                                borderRadius="md"
                                width="100%"
                            >
                                <Flex
                                    flexDirection={{ base: "column", md: "row" }}
                                    flex="1"
                                    minWidth="0"
                                    gap={{ base: 1, md: 0 }}
                                >
                                    <Text
                                        fontWeight={400}
                                        fontSize={{ base: "12px", md: "14px" }}
                                        lineHeight="160%"
                                        color="#161819"
                                        mr={{ base: 0, md: 4 }}
                                        isTruncated
                                        maxWidth={{ base: "100%", md: "40%" }}
                                    >
                                        Mademoiselle 3.4fl.oz 100 ml perfume, CHANEL
                                    </Text>
                                    <Text
                                        fontWeight={400}
                                        fontSize={{ base: "11px", md: "12px" }}
                                        lineHeight="160%"
                                        color="#161819"
                                        opacity={0.6}
                                        isTruncated
                                        flex="1"
                                    >
                                        https://yourproducturlgoeshere1122.com
                                    </Text>
                                </Flex>
                                <Text
                                    fontWeight={400}
                                    fontSize={{ base: "11px", md: "12px" }}
                                    lineHeight="160%"
                                    color="#161819"
                                    opacity={0.6}
                                    alignSelf={{ base: "flex-end", sm: "center" }}
                                    ml={{ base: 0, sm: 2 }}
                                    whiteSpace="nowrap"
                                >
                                    1 min ago
                                </Text>
                            </Flex>

                            <Flex
                                alignItems={{ base: "flex-start", md: "center" }}
                                justifyContent="space-between"
                                flexDirection={{ base: "column", sm: "row" }}
                                bg="white"
                                p={2}
                                borderRadius="md"
                                width="100%"
                                borderTop="1px solid"
                                borderColor="gray.200"
                            >
                                <Flex
                                    flexDirection={{ base: "column", md: "row" }}
                                    flex="1"
                                    minWidth="0"
                                    gap={{ base: 1, md: 0 }}
                                >
                                    <Text
                                        fontWeight={400}
                                        fontSize={{ base: "12px", md: "14px" }}
                                        lineHeight="160%"
                                        color="#161819"
                                        mr={{ base: 0, md: 4 }}
                                        isTruncated
                                        maxWidth={{ base: "100%", md: "40%" }}
                                    >
                                        Cigarettes Crush balls Aroma, BLUE
                                    </Text>
                                    <Text
                                        fontWeight={400}
                                        fontSize={{ base: "11px", md: "12px" }}
                                        lineHeight="160%"
                                        color="#161819"
                                        opacity={0.6}
                                        isTruncated
                                        flex="1"
                                    >
                                        https://yourproducturlgoeshere1122.com
                                    </Text>
                                </Flex>
                                <Text
                                    fontWeight={400}
                                    fontSize={{ base: "11px", md: "12px" }}
                                    lineHeight="160%"
                                    color="#161819"
                                    opacity={0.6}
                                    alignSelf={{ base: "flex-end", sm: "center" }}
                                    ml={{ base: 0, sm: 2 }}
                                    whiteSpace="nowrap"
                                >
                                    2 mins ago
                                </Text>
                            </Flex>
                            <Flex
                                alignItems={{ base: "flex-start", md: "center" }}
                                justifyContent="space-between"
                                flexDirection={{ base: "column", sm: "row" }}
                                bg="white"
                                p={2}
                                borderRadius="md"
                                width="100%"
                                borderTop="1px solid"
                                borderColor="gray.200"
                            >
                                <Flex
                                    flexDirection={{ base: "column", md: "row" }}
                                    flex="1"
                                    minWidth="0"
                                    gap={{ base: 1, md: 0 }}
                                >
                                    <Text
                                        fontWeight={400}
                                        fontSize={{ base: "12px", md: "14px" }}
                                        lineHeight="160%"
                                        color="#161819"
                                        mr={{ base: 0, md: 4 }}
                                        isTruncated
                                        maxWidth={{ base: "100%", md: "40%" }}
                                    >
                                        Cigarettes Crush balls Aroma, BLUE
                                    </Text>
                                    <Text
                                        fontWeight={400}
                                        fontSize={{ base: "11px", md: "12px" }}
                                        lineHeight="160%"
                                        color="#161819"
                                        opacity={0.6}
                                        isTruncated
                                        flex="1"
                                    >
                                        https://yourproducturlgoeshere1122.com
                                    </Text>
                                </Flex>
                                <Text
                                    fontWeight={400}
                                    fontSize={{ base: "11px", md: "12px" }}
                                    lineHeight="160%"
                                    color="#161819"
                                    opacity={0.6}
                                    alignSelf={{ base: "flex-end", sm: "center" }}
                                    ml={{ base: 0, sm: 2 }}
                                    whiteSpace="nowrap"
                                >
                                    2 mins ago
                                </Text>
                            </Flex>

                            <Flex
                                alignItems={{ base: "flex-start", md: "center" }}
                                justifyContent="space-between"
                                flexDirection={{ base: "column", sm: "row" }}
                                bg="white"
                                p={2}
                                borderRadius="md"
                                width="100%"
                                borderTop="1px solid"
                                borderColor="gray.200"
                            >
                                <Flex
                                    flexDirection={{ base: "column", md: "row" }}
                                    flex="1"
                                    minWidth="0"
                                    gap={{ base: 1, md: 0 }}
                                >
                                    <Text
                                        fontWeight={400}
                                        fontSize={{ base: "12px", md: "14px" }}
                                        lineHeight="160%"
                                        color="#161819"
                                        mr={{ base: 0, md: 4 }}
                                        isTruncated
                                        maxWidth={{ base: "100%", md: "40%" }}
                                    >
                                        Cigarettes Crush balls Aroma, BLUE
                                    </Text>
                                    <Text
                                        fontWeight={400}
                                        fontSize={{ base: "11px", md: "12px" }}
                                        lineHeight="160%"
                                        color="#161819"
                                        opacity={0.6}
                                        isTruncated
                                        flex="1"
                                    >
                                        https://yourproducturlgoeshere1122.com
                                    </Text>
                                </Flex>
                                <Text
                                    fontWeight={400}
                                    fontSize={{ base: "11px", md: "12px" }}
                                    lineHeight="160%"
                                    color="#161819"
                                    opacity={0.6}
                                    alignSelf={{ base: "flex-end", sm: "center" }}
                                    ml={{ base: 0, sm: 2 }}
                                    whiteSpace="nowrap"
                                >
                                    2 mins ago
                                </Text>
                            </Flex>
                        </Box>
                    </Box>
                </GridItem>

                <GridItem colSpan={{ base: 1, lg: 1 }}>
                    <Box
                        bg="white"
                        p={{ base: 1, sm: 2, md: 4 }}
                        borderRadius="24px"
                        height="100%"
                    >
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                            mb={{ base: 3, md: 4 }}
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
                            alignItems="center"
                            justifyContent="flex start"
                            width="100%"
                            flexDirection={{ base: "column", sm: "row" }}
                            gap={{ base: 4, sm: 2, md: 4 }}
                            height="calc(100% - 40px)"
                        >
                            <VStack
                                spacing={1}
                                align="center"
                                flex={{ sm: "1" }}
                                maxWidth={{ base: "100%", sm: "40%" }}
                            >
                                <Box
                                    width={{ base: "75px", md: "89px" }}
                                    height={{ base: "75px", md: "89px" }}
                                    borderRadius="50%"
                                    overflow="hidden"
                                    position="relative"
                                    borderColor="#F1F1F1"
                                    borderWidth="5px"
                                >
                                    <Image
                                        src={profileImage}
                                        width="100%"
                                        height="100%"
                                        objectFit="cover"
                                        alt="Carl Meadows"
                                    />
                                </Box>
                                <Text
                                    fontWeight={500}
                                    fontSize={{ base: "11px", md: "12px" }}
                                    lineHeight="160%"
                                    color="#161819"
                                >
                                    Carl Meadows
                                </Text>
                                <Text
                                    fontWeight={400}
                                    fontSize={{ base: "9px", md: "10px" }}
                                    lineHeight="160%"
                                    color="#161819"
                                    opacity={0.5}
                                    mt={-1}
                                >
                                    Admin
                                </Text>
                            </VStack>

                            <VStack
                                spacing={{ base: 2, md: 3 }}
                                align={{ base: "center", sm: "flex-start" }}
                                flex={{ sm: "1" }}
                                width="100%"
                                maxWidth={{ base: "100%", sm: "60%" }}
                            >
                                <Box
                                    width="100%"
                                    height={{ base: "40px", md: "51px" }}
                                    bg="#F4F6F7"
                                    borderRadius="md"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent={{ base: "center", sm: "flex-start" }}
                                    pl={{ base: 2, sm: 3 }}
                                    px={{ base: 2, sm: 3 }}
                                    overflow="hidden"
                                >
                                    <Flex
                                        width="100%"
                                        alignItems="center"
                                        overflow="hidden"
                                    >
                                        <Text
                                            fontWeight={500}
                                            opacity={0.5}
                                            fontSize={{ base: "10px", md: "12px" }}
                                            color="black"
                                            isTruncated
                                            flexShrink={1}
                                            minWidth="auto"
                                            maxWidth={{ base: "60%", sm: "70%" }}
                                        >
                                            Notices Reviewed:
                                        </Text>
                                        <Text
                                            fontWeight={600}
                                            fontSize={{ base: "14px", md: "16px" }}
                                            ml={{ base: 2, md: 4 }}
                                            color="#161819"
                                            isTruncated
                                            flexGrow={1}
                                            textAlign="left"
                                        >
                                            23,353
                                        </Text>
                                    </Flex>
                                </Box>
                                <Box
                                    width="100%"
                                    height={{ base: "40px", md: "51px" }}
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
                </GridItem>
            </SimpleGrid>
        </Box>
    );
}

export default function Dashboard() {
    const { 
        isShakeDetectionActive, 
        shakeCount, 
        pluginStatus, 
        pluginError, 
        testShakeDetection 
    } = useShakeLogout(true);
    
    return (
        <>
            <MainContent/>
            <ShakeIndicator 
                showDetails={true} 
                isShakeDetectionActive={isShakeDetectionActive}
                shakeCount={shakeCount}
                pluginStatus={pluginStatus}
                pluginError={pluginError}
                testShakeDetection={testShakeDetection}
            />
        </>
    )
}