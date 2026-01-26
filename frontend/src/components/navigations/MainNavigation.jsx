import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../store/contexts/AuthContext";
import { useContext } from "react";

export default function MainNavigation() {
    const {isAuthenticated, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate("/login", { replace: true });
    }

    console.log("isAuthenticated:", isAuthenticated);

    return (
        <header className="p-3 bg-blue-950 text-gray-50 shadow-md shadow-amber-200">
            <div className="flex justify-between items- container mx-auto">
                <div>
                <NavLink to="/">
                    Logo
                </NavLink>
            </div>
            <ul className="flex items-center gap-3"> 
                <li>
                    <Link to="/">Home</Link>
                </li>               
                <li>
                    <Link to="register">Register</Link>
                </li>
                {
                    isAuthenticated ?  
                     <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li> :
                    <li>
                        <Link to="login">Login</Link>
                    </li>                    
                }
            </ul>
            </div>
            
        </header>
    );
}