import {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext";

export default function SignUp() {
    const [status, setStatus] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
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

    if (!status) {
        return (
            <div>
                <input type={"text"} placeholder={"Email"} value={email} onChange= {(e) => setEmail(e.target.value)} />
                <input  type={"password"} placeholder={"Password"} value={password} onChange= {(e) => setPassword(e.target.value)} />
                <button onClick={handleSignUp}>Sign Up</button>
            </div>
        )
    }
}