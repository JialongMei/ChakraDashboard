import { useAuth } from '../context/AuthContext'
import { Text } from "@chakra-ui/react";
import { logout as firebaseLogout} from "../useFirebaseAuth";

const LogoutButton = () => {
    const {logout}  = useAuth()

    const handleLogout = async () => {
    try {
      await firebaseLogout();
      alert("Logged out successfully!");
      logout();
    } catch (error) {
      alert(error.message);
    }
  };

    return (
        <button onClick={handleLogout}>
            <Text color="black">Log out</Text>
        </button>
    )
}

export default LogoutButton