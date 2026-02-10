import { createContext, useReducer } from "react";
import {
    getUsers as getUsers, 
    register as apiRegister,
    update as apiUpdate,
    deleteUser as apiDelete,
} from "../../api/auth";


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
                    data: action.payload.users ?? [], 
                    currentPage: action.payload.current_page ?? 1,
                    lastPage: action.payload.last_page ?? 1,
                },
                loading: false, 
                errors: null 
            };
        case "UPDATE_USER":
            {
                const updated = action.payload;
                return {
                    ...state, 
                    users: {
                        ...state.users,
                        data: Array.isArray(state.users?.data)
                        ? state.users.data.map(u => (u.id === updated.id ? updated : u))
                        : [updated],
                    },
                };
            }
        case "DELETE_USER":
            return { 
                ...state, 
                users: {
                    ...state.users,
                    data: state.users.data.filter(
                        u => u.id !== action.payload
                    ),
                }, 
                loading: false, 
                errors: null, 
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

            return { success: true };
        } catch (e) {
            const message = 
            e.response?.data?.message ||
            "Failed to fetch users.";
            dispatchUserAction({type: "SET_ERROR", payload: message});

            return {success: false};
        }
    }

    const register = async (data) => {
        dispatchUserAction({ type: "SET_LOADING" });
        try {
            const res = await apiRegister(data);

            return {
                success: true, 
                users: res.data.user
            };

        } catch (e) {
            const message = 
            e.response?.data?.message ||
            "Failed to register user.";

            dispatchUserAction({ type: "SET_ERROR", payload: message });
   
            return {success: false};
        }
    }

    const update = async (id) => {
        dispatchUserAction({ type: "SET_LOADING" });

        try {
            const res = await apiUpdate(id);

            dispatchUserAction({ 
                type: "UPDATE_USER",
                payload: res.data.user,
            });

            return {
                success: true,
                message: "User updated successfully.",
            };
        } catch (e) {
            const message = 
            e.response?.data?.message ||
            "Failed to update user.";

            dispatchUserAction({ type: "SET_ERROR", payload: message});
        }
    }

    const deleteUser = async (id) => {
        dispatchUserAction({ type: "SET_LOADING" });

        try {
            await apiDelete(id);
            dispatchUserAction({ type: "DELETE_USER", payload: id });
        } catch (e) {
            const message = 
            e.response?.data?.message ||
            "Failed to delete user.";
            dispatchUserAction({ type: "SET_ERROR", payload: message});
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