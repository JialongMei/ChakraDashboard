import { useAuth } from '../context/AuthContext'

const LogoutButton = () => {
    const {logout}  = useAuth()

    const handleLogout = () => {
        logout()
    }

    return (
        <button onClick={handleLogout}>Log out</button>
    )
}

export default LogoutButton