import {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext";
import {
    Alert,
    AlertIcon,
    Box, Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input, Link,
    Text,
    VStack
} from "@chakra-ui/react";

export default function SignUp() {
    const [status, setStatus] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const [users, setUsers] = useState([])
    const {login} = useAuth()

    useEffect(() => {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        }
    }, []);

    const handleSignUp = () => {
        if (email && password) {
            const newUser = {
                email: email,
                password: password,
            }
            setUsers([...users, newUser])
            localStorage.setItem('users', JSON.stringify([...users, newUser]))
            setStatus(true)
            setEmail("")
            setPassword("")
            login()
        }else{
            alert("Please enter a valid email and password")
        }
    }

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
                            Welcome!
                        </Heading>
                        <Text color="gray.600" fontSize="sm" textAlign="center">
                            Sign up to access your dashboard and manage your products
                        </Text>
                    </VStack>

                    {error && (
                        <Alert status="error" mb={4} borderRadius="md">
                            <AlertIcon />
                            {error}
                        </Alert>
                    )}

                    <VStack spacing={4} align="stretch">
                        <FormControl>
                            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
                                Email
                            </FormLabel>
                            <Input
                                type="email"
                                placeholder="your@email.com"
                                size="md"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                borderRadius="md"
                                focusBorderColor="#6F6CF3"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
                                Password
                            </FormLabel>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                size="md"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                borderRadius="md"
                                focusBorderColor="#6F6CF3"
                            />
                        </FormControl>

                        <Button
                            bg="#6F6CF3"
                            color="white"
                            size="md"
                            width="100%"
                            _hover={{ bg: "#5957d7" }}
                            onClick={handleSignUp}
                            mt={2}
                            height="44px"
                            fontWeight="500"
                        >
                            Sign Up
                        </Button>
                    </VStack>
                </Box>
            </Flex>
        </Container>
    );
}