import { useAuth } from '../context/AuthContext'
import { Text, Spinner, Box } from "@chakra-ui/react";
import { logout as firebaseLogout} from "../useFirebaseAuth";
import { useState } from 'react';

const LogoutButton = () => {
    const {logout}  = useAuth()
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
    setIsLoading(true);
    try {
      await firebaseLogout();
      logout();
      // User will be redirected automatically, no need for alert
    } catch (error) {
      console.error("Logout error:", error.message);
      // You could set an error state here if needed, but for now just log it
    } finally {
      setIsLoading(false);
    }
  };

    return (
        <button onClick={handleLogout} disabled={isLoading} style={{ 
            opacity: isLoading ? 0.6 : 1, 
            cursor: isLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        }}>
            {isLoading ? (
                <Box display="flex" alignItems="center" gap={2}>
                    <Spinner size="sm" color="black" />
                    <Text color="black">Logging out...</Text>
                </Box>
            ) : (
            <Text color="black">Log out</Text>
            )}
        </button>
    )
}

export default LogoutButton