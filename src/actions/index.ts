import {
    ActionType,
    User,
    SET_USERS,
    SET_FILTERED_USERS,
} from "../reducers/types";

export const setUsers = (users: User[]): ActionType => {
    return {
        type: SET_USERS,
        payload: users,
    };
};

export const setFilteredUsers = (users: User[]): ActionType => {
    return {
        type: SET_FILTERED_USERS,
        payload: users,
    };
};
