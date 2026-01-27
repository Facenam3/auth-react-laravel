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
        <header className="p-3 bg-gray-950 text-red-400  shadow-amber-200">
            <div className="flex justify-between items- container mx-auto">
                <div>
                <NavLink to="/" className="hover:text-red-600 shadow-md">
                    Logo
                </NavLink>
            </div>
            <ul className="flex items-center gap-3"> 
                <li>
                    <Link to="/" className="hover:text-red-600 shadow-md">Home</Link>
                </li>               
                <li>
                    <Link to="register" className="hover:text-red-600 shadow-md">Register</Link>
                </li>
                {
                    isAuthenticated ?  
                     <li>
                        <button className="hover:text-red-600 shadow-md" onClick={handleLogout}>Logout</button>
                    </li> :
                    <li>
                        <Link className="hover:text-red-600 shadow-md" to="login">Login</Link>
                    </li>                    
                }
            </ul>
            </div>
            
        </header>
    );
}