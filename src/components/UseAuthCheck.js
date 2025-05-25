import { useQuery } from "@tanstack/react-query";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

const useAuthCheck = () => {
    const { user } = useAuth();

    const fetchAuthStatus = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            throw new Error("No user is currently logged in");
        }

        // Get the token dynamically from Firebase
        const token = await currentUser.getIdToken();
        
        // For now, just return the user data since we're using Firebase auth
        return {
            email: currentUser.email,
            uid: currentUser.uid
        };
    };

    const { data, error, isLoading } = useQuery({
        queryKey: ["authStatus", user?.uid],
        queryFn: fetchAuthStatus,
        enabled: !!user, // Only run the query if we have a user
        retry: false, // Disable retries for authentication
    });

    return { data, error, isLoading };
};

export default useAuthCheck;