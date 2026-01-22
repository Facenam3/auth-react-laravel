import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/contexts/AuthContext";

export default function ProtectedLayout({children}) {
    const { isAuthenticated } = useContext(AuthContext);

    if(!isAuthenticated) {
        return <Navigate to="/login" replace />;
    };

    return children;
}