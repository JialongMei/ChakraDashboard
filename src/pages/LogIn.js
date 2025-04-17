import {useEffect, useState} from "react"
import {useNavigate, Link} from "react-router-dom"
import {useAuth} from "../context/AuthContext"

export function LogIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const {login} = useAuth()

    useEffect(() => {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        }
    }, []);

    const handleLogin = () => {
        if (email && password) {
            const user = users.find(user =>
                user.email === email && user.password === password
            );

            if (user) {
                login()
                setEmail("");
                setPassword("");
                localStorage.setItem('currentUser', JSON.stringify(user));
            } else {
                alert("Invalid email or password");
            }
        } else {
            alert("Please enter email and password");
        }
    }

    const handleSignUpClick = () => {
        navigate("/signup")
    };

    return (
        <div>
        <input type={"text"} placeholder={"Email"} value={email} onChange={(e) => setEmail(e.target.value)} />
        <input  type={"password"} placeholder={"Password"} value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignUpClick}>Sign up</button>
        </div>
    )
}