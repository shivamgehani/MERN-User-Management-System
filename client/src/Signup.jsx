import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Signup() {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log(name, email, password);
        axios.post('http://localhost:3001/register', { name, email, password })
             .then(result => console.log(result));
             navigate('/login')

    }

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    placeholder="Enter email"
                    autoComplete="off"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    placeholder="Enter Name"
                    autoComplete="off"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Enter Password"
                    autoComplete="off"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Register</button>
            </form>
            <h2>Already have an account? Click on login</h2>
            <Link to="/login">Login</Link>
        </div>
    );
}

export default Signup;