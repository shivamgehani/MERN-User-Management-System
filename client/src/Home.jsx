// client/src/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [updatedUser, setUpdatedUser] = useState({ name: "", email: "", password: "" });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get("http://localhost:3001/users")
            .then(response => setUsers(response.data))
            .catch(error => console.error("There was an error!", error));
    };

    const handleEditClick = (user) => {
        setEditingUser(user._id);
        setUpdatedUser({ name: user.name, email: user.email, password: user.password });
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/user/${editingUser}`, updatedUser)
            .then(() => {
                setEditingUser(null);
                fetchUsers();
            })
            .catch(error => console.error("There was an error!", error));
    };

    const handleDeleteClick = (id) => {
        axios.delete(`http://localhost:3001/user/${id}`)
            .then(() => fetchUsers())
            .catch(error => console.error("There was an error!", error));
    };

    return (
        <div>
            <h1>Successfully logged in</h1>
            <h2>All Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {editingUser === user._id ? (
                            <form onSubmit={handleUpdateSubmit}>
                                <input
                                    type="text"
                                    value={updatedUser.name}
                                    onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
                                    placeholder="Name"
                                />
                                <input
                                    type="text"
                                    value={updatedUser.email}
                                    onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                                    placeholder="Email"
                                />
                                <input
                                    type="password"
                                    value={updatedUser.password}
                                    onChange={(e) => setUpdatedUser({ ...updatedUser, password: e.target.value })}
                                    placeholder="Password"
                                />
                                <button type="submit">Update</button>
                                <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
                            </form>
                        ) : (
                            <>
                                <span>{user.name} - {user.email}</span>
                                <button onClick={() => handleEditClick(user)}>Edit</button>
                                <button onClick={() => handleDeleteClick(user._id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
