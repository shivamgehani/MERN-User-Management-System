import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                console.log(result);
                if (result.data === "Success") {
                    navigate('/home');
                }
                else{
                    alert("wrong credentials")
                } 
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <div>
            <h2>Login</h2>
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

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Enter Password"
                    autoComplete="off"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>
            <h2>Don't have an account? Click on signup</h2>
            <Link to="/register">Signup</Link>
        </div>
    );
}

export default Login;