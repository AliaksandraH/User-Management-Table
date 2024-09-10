export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

export interface AppState {
    users: User[];
    filteredUsers: User[];
}

export type ActionType =
    | { type: "SET_USERS"; payload: User[] }
    | { type: "SET_FILTERED_USERS"; payload: User[] };

export const SET_USERS = "SET_USERS";
export const SET_FILTERED_USERS = "SET_FILTERED_USERS";
