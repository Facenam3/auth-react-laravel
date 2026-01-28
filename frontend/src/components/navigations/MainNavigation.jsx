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

    const linkActive = "text-red-600 underline";

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
                {!isAuthenticated && (
                    <li>
                        <NavLink to="/" end className={({isActive}) => { 
                            console.log("Home active: " , isActive);
                            return isActive ? linkActive : "";
                         } }>Home</NavLink>
                    </li> 
                )}
                {!isAuthenticated && (
                    <li>
                        <NavLink to="/register" end className={({isActive}) => ( isActive ? linkActive : "" )}>Register</NavLink>
                    </li>
                )}
                {isAuthenticated && (
                    <li>
                        <NavLink to="/dashboard" end className={({isActive}) => ( isActive ? linkActive : "" )}>
                            Dashboard
                        </NavLink>
                    </li>
                )}           
                
                {
                    isAuthenticated ?  
                     <li>
                        <button className="hover:text-red-600 shadow-md cursor-pointer" onClick={handleLogout}>Logout</button>
                    </li> :
                    <li>
                        <NavLink to="/login" end className={({isActive}) => ( isActive ? linkActive : "" )} >Login</NavLink>
                    </li>                    
                }
            </ul>
            </div>
            
        </header>
    );
}