import { createContext, useReducer } from "react";

const AuthContext = createContext({
    users: [],
    user: null,
    isAuthenticated: false,
    loading: false,
    errors: [],
    login: (email, password) => {},
    register: (data) => {},
    logout: () => {},
});

const initialState = {
    users: {}, 
    user: null, 
    isAuthenticated: false, 
    loading: false,
    error: [],
};

function authReducer(state, action) {
    switch (action.type) {
        case "REGISTER":
            return {
                ...state,
                users: [...state.users, action.user],
                errors: [],
            };

        case "LOGIN":
            const user = state.users.find(user => user.email === action.email);
            if(!user) {
                return {
                    ...state, 
                    errors: ["User not found!"],
                    isAuthenticated: false,
                };
            }

            return {
                ...state, 
                user,
                isAuthenticated: true,
                errors: [],
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

     function register(data) {
        dispatchAuthAction({ type: "REGISTER", data })
    }

    function login(email, password) {
        dispatchAuthAction({ type: "LOGIN" , email, password });
    }

    function logout() {
        dispatchAuthAction({ type: "LOGOUT" });
    }

       const authContext = {
        ...auth,
        register,
        login,
        logout,
    };

    return <AuthContextProvider value={authContext}>{children}</AuthContextProvider>;
}

export default AuthContext;