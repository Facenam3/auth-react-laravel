import { createContext, useReducer } from "react";
import * as api from "../../api/auth";

const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    loading: false,
    errors: null,
    login: async () => {},
    logout: async () => {},
});

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    errors: null,
};

function authReducer(state, action) {
    switch (action.type) {
        case "SET_LOADING":
            return { ...state, loading: true, errors: null};

        case "LOGIN_SUCCESS":
           return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false,
           };
        case "AUTH_ERROR":
            return {
                ...state,
                errors: action.payload,
                loading: false,
            };
        case "LOGOUT" :
            return {
                ...state, 
                user: null,
                isAuthenticated: false,
                errors: [],
            };
    
        default:
            return state;
    }
}

export function AuthContextProvider({children}) {
    const [auth, dispatchAuthAction] = useReducer(authReducer, initialState);

    async function login(data) {
       dispatchAuthAction({ type: "SET_LOADING" });
       try {
        await api.login(data);
        const res = await api.getUser();
        dispatchAuthAction({ type: "LOGIN_SUCCESS", payload: res.data.user});
       } catch (e) {
        console.log(e);
        dispatchAuthAction({ type: "AUTH_ERROR" , payload: "Login failed"});
       }
    }

    async function logout() {
        await api.logout();
        dispatchAuthAction({ type: "LOGOUT" });
    }

       const authContext = {
        ...auth,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>);
}

export default AuthContext;