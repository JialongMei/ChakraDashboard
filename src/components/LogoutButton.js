import { useAuth } from '../context/AuthContext'
import { Text } from "@chakra-ui/react";

const LogoutButton = () => {
    const {logout}  = useAuth()

    const handleLogout = () => {
        logout()
    }

    return (
        <button onClick={handleLogout}>
            <Text color="black">Log out</Text>
        </button>
    )
}

export default LogoutButton