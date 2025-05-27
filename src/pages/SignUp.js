import {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext";
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Input,
    Text,
    VStack,
    Spinner,
} from "@chakra-ui/react";
import {register as firebaseRegister} from "../useFirebaseAuth";

export default function SignUp() {
    const [status, setStatus] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [users, setUsers] = useState([])
    const {login} = useAuth()


    useEffect(() => {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        }
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!email || !password) {
          setError("Email and password are required.");
          return;
        }
        
        setIsLoading(true);
        setError(""); // Clear any previous errors
        
        try {
          await firebaseRegister(email, password);
          // Show success message briefly before redirect
          setError(""); // Make sure no error is shown
          setShowSuccess(true);
          // The user will be automatically redirected after successful registration
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
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
                            Welcome!
                        </Heading>
                        <Text color="gray.600" fontSize="sm" textAlign="center">
                            Sign up to access your dashboard and manage your products
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
                                placeholder="your@email.com"
                                color="black"
                                size="md"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                borderRadius="md"
                                focusBorderColor="#6F6CF3"
                                disabled={isLoading}
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
                                disabled={isLoading}
                            />
                        </Box>

                        <Button
                            bg="#6F6CF3"
                            color="white"
                            size="md"
                            width="100%"
                            _hover={{ bg: isLoading ? "#6F6CF3" : "#5957d7" }}
                            onClick={handleRegister}
                            mt={2}
                            height="44px"
                            fontWeight="500"
                            isLoading={isLoading}
                            loadingText="Creating account..."
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating account..." : "Sign Up"}
                        </Button>

                        {isLoading && (
                            <Box textAlign="center" mt={3}>
                                <Text fontSize="sm" color="gray.600">
                                    Please wait, we're setting up your account...
                                </Text>
                            </Box>
                        )}

                        {showSuccess && (
                            <Box 
                                textAlign="center" 
                                mt={3} 
                                p={3} 
                                borderRadius="md" 
                                bg="green.50" 
                                border="1px solid" 
                                borderColor="green.200"
                            >
                                <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                                    <Spinner size="sm" color="green.500" />
                                    <Text fontSize="sm" color="green.700" fontWeight="medium">
                                        Account created successfully! Redirecting...
                                    </Text>
                                </Box>
                            </Box>
                        )}
                    </VStack>
                </Box>
            </Flex>
        </Container>
    );
}