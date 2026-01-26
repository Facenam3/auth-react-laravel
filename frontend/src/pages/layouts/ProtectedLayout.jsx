import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/contexts/AuthContext";

export default function ProtectedLayout() {
    const { isAuthenticated, loading } = useContext(AuthContext);

    if(loading) {
        return <p className="text-center mt-10">Loading...</p>
    }

    if(!isAuthenticated) {
        return <Navigate to="/login" replace />;
    };

    return <Outlet />;
}