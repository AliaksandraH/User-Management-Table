import { AppState, ActionType, SET_USERS, SET_FILTERED_USERS } from "./types";

const initialState = {
    users: [],
    filteredUsers: [],
};

const reducer = (
    state: AppState = initialState,
    action: ActionType
): AppState => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.payload,
            };
        case SET_FILTERED_USERS:
            return {
                ...state,
                filteredUsers: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
