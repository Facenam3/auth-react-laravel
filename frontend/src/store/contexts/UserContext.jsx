import { createContext, useReducer } from "react";
import {
    getUsers as getUsers, 
    register as apiRegister,
    update as apiUpdate,
    deleteUser as apiDelete
} from "../../api/auth";
import csrf from "../../api/csrf";


const UserContext = createContext({
    users: [],
    loading: false,
    errors: null,
    fetchUsers: () => {},
    register: () => {},
    update: () => {},
    deleteUser: () => {},
});

const initialState = {
    users: {
        data: [],
        currentPage: 1,
        lastPage: 1,
    },    
    loading: false, 
    errors: null
};

function userReducer(state, action) {
    switch (action.type) {
        case "SET_LOADING":
            return { 
                ...state, 
                loading: true
            };
        case "SET_LOADING_DONE":
            return {
                ...state,
                loading: false,
            }
        case "SET_ERROR": 
            return { 
                ...state, 
                loading: false, 
                errors: action.payload 
            };
        case "SET_USERS":
            return { 
                ...state, 
                users:{ 
                    data: action.payload.users, 
                    currentPage: action.payload.current_page,
                    lastPage: action.payload.last_page,
                },
                loading: false, 
                errors: null 
            };
        case "UPDATE":
            const idx = state.users.findIndex(user => user.id === action.payload.id);
            if (idx === -1) return state;
            const updatedUsers = [...state.users];
            updatedUsers[idx] = {...updatedUsers[idx], ...action.payload};
            return { 
                ...state, 
                users: updatedUsers, 
                loading: false, 
                errors: null
            };
        case "DELETE":
            return { 
                ...state, 
                users: state.users.filter(u => u.id !== action.payload), 
                loading: false, errors: false 
            };
        case "CLEAR_ERRORS":
            return {
                ...state,
                errors: null,
            };
    
        default:
            return state;
    }
}

export function UserContextProvider({children}) {
    const [user, dispatchUserAction] = useReducer(userReducer, initialState);

    const fetchUsers = async (page = 1) => {
        dispatchUserAction({type: "SET_LOADING"});
        try {
            const res =  await getUsers(page);

            dispatchUserAction({ 
                type: "SET_USERS", 
                payload: res.data
            });

            dispatchUserAction({ type: "SET_LOADING", payload: false });

            return { success: true };
        } catch (e) {
            console.log(e);
            dispatchUserAction({type: "SET_ERROR", payload: "Failed to fetch users"});

            return {success: false};
        }
    }

    const register = async (data) => {
        dispatchUserAction({ type: "SET_LOADING" });
        try {
            await csrf();
            const res = await apiRegister(data);
            
            dispatchUserAction({ type: "SET_LOADING", payload: false });
            dispatchUserAction({ type: "SET_ERROR", payload: null });

            return {
                success: true, 
                users: res.data.user
            };

        } catch (e) {
            const message = 
            e.response?.data?.message ||
            "Failed to register user.";

            dispatchUserAction({ type: "SET_ERROR", payload: message });
            dispatchUserAction({ type: "SET_LOADING", payload: false });  
            
            return {success: false};
        }
    }

    const update = async (id, data) => {
        dispatchUserAction({ type: "SET_LOADING" });

        try {
            const res = await apiUpdate(id, data);
            dispatchUserAction({ type: "UPDATE", payload: res.data });
        } catch (e) {
            console.log(e);
            dispatchUserAction({ type: "SET_ERROR", payload: "Failed to update user."});
        }
    }

    const deleteUser = async (id) => {
        dispatchUserAction({ type: "SET_LOADING" });

        try {
            await apiDelete(id);
            dispatchUserAction({ type: "DELETE", payload: id });
        } catch (e) {
            console.log(e);
            dispatchUserAction({ type: "SET_ERROR", payload: "Failed to delete user."});
        }
    }

    const userContext = {
        ...user,
        fetchUsers,
        register,
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