import axios from "axios";
import {useAuth} from "../context/AuthContext";
import {auth} from "../firebase";
import {useQuery} from "@tanstack/react-query";

const useAuthCheck = () => {
    const {login, logout} = useAuth();

    const fetchAuthStatus = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            throw new Error("No user is currently logged in");
        }


        // Get the token dynamically from Firebase
        const token = await currentUser.getIdToken();

        const response = await axios.get("http://127.0.0.1:8000/api/user/user_profile", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    }

    const {data, error, isLoading} = useQuery({
        queryKey: ["authStatus"],
        queryFn: fetchAuthStatus,
        onSuccess: (data) => {
            login(data); // Update global auth state on success
        },
        onError: () => {
            logout(); // Logout on error
        },
        retry: false, // Disable retries for authentication
    });

    return {data, error, isLoading};
};

export default useAuthCheck;