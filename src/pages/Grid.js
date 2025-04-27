import Logoutbutton from "../components/LogoutButton";
import {Avatar, Box, Button, Flex, Grid, GridItem, HStack, Icon, Image, Input, Spacer, VStack} from "@chakra-ui/react";
import {Text} from "@chakra-ui/react";
import {ReactComponent as HomeIconSvg} from "../icon/home-2.svg";
import {ReactComponent as Quote} from "../icon/quote-down-square.svg"
import {ReactComponent as Command_square} from "../icon/command-square.svg"
import {ReactComponent as Hashtag} from "../icon/hashtag.svg"
import {ReactComponent as Notification_bing} from "../icon/notification-bing.svg"
import {ReactComponent as Setting} from "../icon/setting.svg"
import {ReactComponent as User} from "../icon/filled_user.svg"
import {ReactComponent as Search_normal} from "../icon/search-normal.svg"
import {ReactComponent as Profile_example} from "../image/Group 35556.svg"
import Image1 from "../image/img_1.png";
import {ReactComponent as Logout_icon} from "../icon/logout.svg";
import {useLocation, useNavigate} from 'react-router-dom';
import {InputGroup, InputElement, SimpleGrid} from "@chakra-ui/react";
import LayoutWrapper from "../components/LayoutWrapper";


const ProductCard = ({ hasSourceButton = false }) => {
    return (
        <VStack
            bg="white"
            p={3}
            borderRadius="lg"
            alignItems="flex-start"
            justifyContent="space-between"
            height={{ base: "280px", md: "320px", lg: "380px" }}
            spacing={2}
            transition="transform 1.2s, box-shadow 1.2s"
            _hover={{
                boxShadow: "md",
                transform: "translateY(-2px)"
            }}
        >
            <Box
                width="100%"
                borderRadius="xl"
                height="60%"
                overflow="hidden"
                position="relative"
                mb={2}
            >
                <Image
                    src={Image1}
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    transition="transform 0.3s"
                    _hover={{
                        transform: "scale(1.05)"
                    }}
                />
            </Box>

            <Box width="100%" mb={2}>
                <Text
                    fontSize={{ base: "xs", sm: "sm", md: "md" }}
                    fontWeight={500}
                    noOfLines={1}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    width="100%"
                    mb={1}
                    color="black"
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
                    color="gray.500"
                >
                    https://yourproducturlgoeshere1122.com
                </Text>
            </Box>

            {hasSourceButton ? (
                <Flex width="100%" alignItems="center" justifyContent="space-between" mt="auto">
                    <Box
                        width="60%"
                        bg="purple.600"
                        borderRadius="md"
                        py={1}
                        px={2}
                        cursor="pointer"
                        transition="background 0.2s"
                        _hover={{ bg: "purple.800" }}
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
                        width="35%"
                        bg="black"
                        borderRadius="md"
                        py={1}
                        px={2}
                        cursor="pointer"
                        transition="background 0.2s"
                        _hover={{ bg: "gray.800" }}
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
            ) : (
                <Box
                    width="60%"
                    bg="purple.600"
                    borderRadius="md"
                    py={1}
                    px={2}
                    cursor="pointer"
                    transition="background 0.2s"
                    _hover={{ bg: "purple.800" }}
                    mt="auto"
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
            )}
        </VStack>
    );
};

// 视图切换按钮组件
const ViewToggleButton = ({ isActive, label, onClick }) => {
    return (
        <Button
            size="sm"
            mr={2}
            onClick={onClick}
            bg={isActive ? "black" : "white"}
            color={isActive ? "white" : "black"}
            borderRadius="md"
            fontWeight="medium"
            height="30px"
            minWidth="80px"
            border="1px solid"
            borderColor={isActive ? "black" : "gray.200"}
            transition="all 0.2s"
            _hover={{
                bg: isActive ? "gray.800" : "gray.100",
                transform: "translateY(-2px)",
                boxShadow: "sm"
            }}
        >
            {label}
        </Button>
    );
};

const MainContent = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 检测当前视图
    const isGridView = location.pathname.includes('/grid');
    const isListView = location.pathname.includes('/list');

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
                <Text
                    fontWeight="medium"
                    fontSize={{ base: "md", md: "lg" }}
                    color="black"
                >
                    Product List
                </Text>

                <Flex
                    align="center"
                    flexWrap="wrap"
                    gap={2}
                >
                    <ViewToggleButton
                        isActive={isGridView}
                        label="Grid View"
                        onClick={() => navigate('/dashboard/reviews/grid')}
                    />
                    <ViewToggleButton
                        isActive={isListView}
                        label="List View"
                        onClick={() => navigate('/dashboard/reviews/list')}
                    />
                </Flex>
            </Flex>

            <Box
                overflow="auto"
                height="fit-content"
                minHeight="0"
            >
                {/* control spacing and layout */}
                <SimpleGrid
                    columns={{ base: 1, sm: 2, md: 3, lg: 4}}
                    gap={{base: 4, md: 5}}
                    width="100%"
                >
                    <ProductCard hasSourceButton={false} />

                    {[...Array(7)].map((_, index) => (
                        <ProductCard key={index} hasSourceButton={true} />
                    ))}
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default function Productgrid() {
    return (
        <LayoutWrapper>
            <MainContent/>
        </LayoutWrapper>
    );
}