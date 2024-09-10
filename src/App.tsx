import { useState, useEffect, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsers, setFilteredUsers } from "./actions";
import { AppState } from "./reducers/types";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

interface SearchState {
    name: string;
    username: string;
    email: string;
    phone: string;
}

const selectUsers = (state: AppState) => state.users;
const selectFilteredUsers = (state: AppState) => state.filteredUsers;

const App = () => {
    const dispatch = useDispatch();
    const users = useSelector((state: AppState) => selectUsers(state));
    const filteredUsers = useSelector((state: AppState) =>
        selectFilteredUsers(state)
    );
    const [search, setSearch] = useState<SearchState>({
        name: "",
        username: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        const filtered = users.filter((user) => filterTexts(user));
        dispatch(setFilteredUsers(filtered));
    }, [search, users]);

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
            dispatch(setUsers(data));
        } catch (error) {
            console.log(error);
        }
    };

    const changeSearchText = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setSearch((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const filterTexts = (user: User): boolean => {
        return (
            user.name.toLowerCase().includes(search.name.toLowerCase()) &&
            user.username
                .toLowerCase()
                .includes(search.username.toLowerCase()) &&
            user.email.toLowerCase().includes(search.email.toLowerCase()) &&
            user.phone.toLowerCase().includes(search.phone.toLowerCase())
        );
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
                        <tr>
                            <th>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Search name..."
                                    onChange={changeSearchText}
                                />
                            </th>
                            <th>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Search username..."
                                    onChange={changeSearchText}
                                />
                            </th>
                            <th>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Search email..."
                                    onChange={changeSearchText}
                                />
                            </th>
                            <th>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Search phone..."
                                    onChange={changeSearchText}
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers &&
                            filteredUsers.length > 0 &&
                            filteredUsers.map((user) => {
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
