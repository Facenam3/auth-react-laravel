import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../store/contexts/AuthContext.jsx";
import { validateLogin } from "../../validators/auth.js";

import GlassmorphicCard from "../../components/UI/GlassmorphicCard.jsx";

export default function LoginPage() {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const location = useLocation();
    const [successMsg , setSuccessMsg] = useState(
        location.state?.success || ""
    );
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if(authCtx.errors){
            console.log("Auth error from backend:", authCtx.errors);
        }
    }, [authCtx.errors]);

    useEffect(() => {
        if(authCtx.isAuthenticated){
            navigate("/dashboard");
        }
    }, [authCtx.isAuthenticated, navigate]);

    console.log(authCtx.errors);

    async function handleLoginSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());

        const errors = validateLogin(data);

        if(Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        setFormErrors({});
        setSuccessMsg("");
        await authCtx.login(data);      
    }

    return (
        <GlassmorphicCard>
            {
                successMsg && (
                    <div className="mb-4 p-2 text-center rounded-md bg-green-500/15 text-green-400 text-sm">
                        {successMsg}
                    </div>
                )
            }
            <h1 className="text-center mb-5 font-bold text-3xl text-rose-700">Login Page</h1>
            <form onSubmit={handleLoginSubmit} className="p-5 text-center rounded-md border-2 border-rose-950">
                <div className="mb-3">
                    <label htmlFor="email" className="block mb-3 text-left">Email</label>
                    <input 
                    className="bg-white text-gray-950 w-full px-2 py-1 outline-1 outline-blue-300 rounded-md" 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="Johndoe@example.com"
                    />
                    {formErrors.email && (
                        <p className="text-red-500 text-sm mt-2">{formErrors.email}</p>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="block mb-3 text-left">Password</label>
                    <input 
                    className="bg-gray-50 text-gray-950 w-full px-2 py-1 outline-1 outline-blue-300 rounded-md" 
                    type="password" 
                    name="password" 
                    id="password" 
                    />
                    {formErrors.password && (
                        <p className="text-red-500 text-sm mt-2">{formErrors.password}</p>
                    )}
                </div>
                <div className="flex justify-center items-center">
                    <button 
                    className="px-2.5 py-1.5 rounded-md text-center bg-rose-500 text-gray-50 border-2 border-red-900 hover:bg-red-700 hover:text-gray-100" 
                    type="submit"
                    >
                    Login
                    </button>                    
                </div>
                {authCtx.errors && (
                    <div className="bg-red-500/10 text-red-400 p-2 rounded mt-3">
                        {authCtx.errors}
                    </div>
                )}
            </form>
        </GlassmorphicCard>
    );
}