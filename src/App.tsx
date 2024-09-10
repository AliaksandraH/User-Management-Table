import { useState, useEffect } from "react";
import "./App.css";

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

const App = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async (): Promise<void> => {
        try {
            const url = "https://jsonplaceholder.typicode.com/users";
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data: User[] = await response.json();
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {users && users.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p className="list-empty">The list is empty.</p>
            )}
        </>
    );
};

export default App;
