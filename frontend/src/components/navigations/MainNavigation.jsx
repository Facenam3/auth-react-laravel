import { Link, NavLink } from "react-router-dom";

export default function MainNavigation() {
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
                    <Link to="login">Login</Link>
                    </li>
                <li>
                    <Link to="register">Register</Link>
                </li>
            </ul>
            </div>
            
        </header>
    );
}