import { createContext, useReducer } from "react";
import {login as loginApi, logout as logoutApi} from "../../api/auth";
import csrf from "../../api/csrf";

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
            return { ...state, loading: true};

        case "LOGIN_SUCCESS":
           return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false,
           };
        case "AUTH_ERROR":
            console.log("REDUCER RECEIVED AUTH_ERROR:", action.payload);
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

export function AuthContextProvider({children}) {
    const [auth, dispatchAuthAction] = useReducer(authReducer, initialState);

    async function login(data) {
        dispatchAuthAction({type: "CLEAR_ERRORS"});

       dispatchAuthAction({ type: "SET_LOADING" });
       try {
        await csrf();
        const res = await loginApi(data);

        localStorage.setItem("token", res.data.token);
        dispatchAuthAction({ type: "LOGIN_SUCCESS", payload: res.data.user});

        return {success: true, user: res.data.user};
       } catch (e) {
        const message = 
        e.response?.data?.message || 
        e.response?.data?.errors?.email?.[0] ||
        "Invalid credentials";

        console.log("DISPATCHING AUTH_ERROR WITH:", message);
        dispatchAuthAction({ type: "AUTH_ERROR" , payload: message});

        return { success: false };
       }
    }

    async function logout() {
          try {
        await logoutApi(); 
        } catch (e) {
            console.warn("Logout API failed, clearing client state anyway");
            console.log(e);
        } finally {
            localStorage.removeItem("token");
            dispatchAuthAction({ type: "LOGOUT" });
        }      
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