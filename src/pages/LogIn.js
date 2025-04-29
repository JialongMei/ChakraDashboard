import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Input,
    Text,
    VStack,
    Link,
} from "@chakra-ui/react";

export function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        }
    }, []);

    const handleLogin = () => {
        setError("");

        if (!email || !password) {
            setError("Please enter a valid email and password");
            return;
        }

        const user = users.find(
            (user) => user.email === email && user.password === password
        );

        if (user) {
            login();
            setEmail("");
            setPassword("");
            localStorage.setItem("currentUser", JSON.stringify(user));
            navigate("/dashboard");
        } else {
            setError("Invalid email or password");
        }
    };

    const handleSignUpClick = () => {
        navigate("/signup");
    };

    return (
        <Container maxW="100%" p={0} height="100vh" bg="#F7F8FC">
            <Flex height="100%" align="center" justify="center">
                <Box
                    bg="white"
                    p={8}
                    borderRadius="lg"
                    boxShadow="md"
                    width={{ base: "90%", md: "450px" }}
                >
                    <VStack spacing={6} align="center" mb={8}>
                        <Text
                            fontFamily="Urbanist"
                            fontWeight={900}
                            fontSize="52px"
                            lineHeight="160%"
                            letterSpacing="0%"
                            color="#161819"
                            whiteSpace="nowrap"
                        >
                            LOGO
                        </Text>
                        <Heading size="lg" color="gray.800">
                            Welcome Back
                        </Heading>
                        <Text color="gray.600" fontSize="sm" textAlign="center">
                            Sign in to access your dashboard and manage your products
                        </Text>
                    </VStack>

                    {error && (
                        <Box
                            p={3}
                            mb={4}
                            borderRadius="md"
                            bg="red.100"
                            color="red.700"
                        >
                            {error}
                        </Box>
                    )}

                    <VStack spacing={4} align="stretch">
                        <Box>
                            <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                                Email
                            </Text>
                            <Input
                                type="email"
                                color="black"
                                placeholder="your@email.com"
                                size="md"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                borderRadius="md"
                                focusBorderColor="#6F6CF3"
                            />
                        </Box>

                        <Box>
                            <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                                Password
                            </Text>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                color="black"
                                size="md"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                borderRadius="md"
                                focusBorderColor="#6F6CF3"
                            />
                        </Box>

                        <Button
                            bg="#6F6CF3"
                            color="white"
                            size="md"
                            width="100%"
                            _hover={{ bg: "#5957d7" }}
                            onClick={handleLogin}
                            mt={2}
                            height="44px"
                            fontWeight="500"
                        >
                            Sign In
                        </Button>

                        <Flex justify="center" mt={4}>
                            <Text fontSize="sm" color="gray.600">
                                Don't have an account?{" "}
                                <Link
                                    color="#6F6CF3"
                                    fontWeight="500"
                                    onClick={handleSignUpClick}
                                    cursor="pointer"
                                >
                                    Sign Up
                                </Link>
                            </Text>
                        </Flex>
                    </VStack>
                </Box>
            </Flex>
        </Container>
    );
}