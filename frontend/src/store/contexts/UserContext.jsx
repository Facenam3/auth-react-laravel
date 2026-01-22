import { createContext, useReducer } from "react";
import * as api from "../../api/auth";

const UserContext = createContext({
    users: [],
    loading: false,
    errors: null,
    fetchUsers: () => {},
    register: () => {},
    update: () => {},
    delete: () => {},
});

const initialState = {
    users: [],
    loading: false, 
    errors: null
};

function userReducer(state, action) {
    switch (action.type) {
        case "SET_LOADING":
            return { ...state, loading: true, errors: false};
        case "SET_ERROR": 
            return { ...state, loading: false, errors: action.payload };
        case "SET_USERS":
            return { ...state, users: action.payload, loading: false, errors: null };
        case "REGISTER": 
            return { ...state, users: [...state.users, action.payload], loading: false, errors: null};
        case "UPDATE":
            const idx = state.users.findIndex(user => user.id === action.payload.id);
            if (idx === -1) return state;
            const updatedUsers = [...state.users];
            updatedUsers[idx] = {...updatedUsers[idx], ...action.payload};
            return { ...state, users: updatedUsers, loading: false, errors: null};
        case "DELETE":
            return { ...state, users: state.users.filter(u => u.id !== action.payload), loading: false, errors: false };
    
        default:
            return state;
    }
}

export function UserContextProvider({children}) {
    const [user, dispatchUserAction] = useReducer(userReducer, initialState);

    const fetchUsers = async () => {
        dispatchUserAction({type: "SET_LOADING"});
        try {
            const res =  await api.getUsers();
            dispatchUserAction({type: "SET_USERS", payload: res.data});
        } catch (e) {
            console.log(e);
            dispatchUserAction({type: "SET_ERROR", payload: "Failed to fetch users"});
        }
    }

    const registerUser = async (data) => {
        dispatchUserAction({ type: "SET_LOADING" });
        try {
            const res = await api.register(data);
            dispatchUserAction({ type: "REGISTER", payload: res.data });
        } catch (e) {
            console.log(e);
            dispatchUserAction({ type: "SET_ERROR", payload: "Failed to register user." });            
        }
    }

    const update = async (id, data) => {
        dispatchUserAction({ type: "SET_LOADING" });

        try {
            const res = await api.updateUser(id, data);
            dispatchUserAction({ type: "UPDATE", payload: res.data });
        } catch (e) {
            console.log(e);
            dispatchUserAction({ type: "SET_ERROR", payload: "Failed to update user."});
        }
    }

    const deleteUser = async (id) => {
        dispatchUserAction({ type: "SET_LOADING" });

        try {
            await api.deleteUser(id);
            dispatchUserAction({ type: "DELETE", payload: id });
        } catch (e) {
            console.log(e);
            dispatchUserAction({ type: "SET_ERROR", payload: "Failed to delete user."});
        }
    }

    const userContext = {
        ...user,
        fetchUsers,
        registerUser,
        update,
        deleteUser,
    }

    return (
        <UserContext.Provider value={userContext}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;