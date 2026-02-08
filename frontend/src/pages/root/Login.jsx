import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../store/contexts/AuthContext.jsx";
import { validateLogin } from "../../validators/auth.js";

import GlassmorphicCard from "../../components/UI/GlassmorphicCard.jsx";
import InputGroup from "../../components/UI/form/Input.jsx";
import ButtonSubmit from "../../components/UI/form/ButtonSubmit.jsx";
import FormInput from "../../components/UI/form/FormInput.jsx";

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

        <FormInput pageName="Login Page" onSubmit={handleLoginSubmit} >
              {
                successMsg && (
                    <div className="mb-4 p-2 text-center rounded-md bg-green-500/15 text-green-400 text-sm">
                        {successMsg}
                    </div>
                )
            }
            <InputGroup
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="JohnDoe@example.com"
                    errors={formErrors.email}
                />
                <InputGroup 
                    label="password"
                    type="password"
                    name="password"
                    placeholder="******"
                    errors={formErrors.password}
                />
                <div className="flex justify-center items-center">
                    <ButtonSubmit 
                        name="Login"
                        type="submit"
                    />                    
                </div>
                {authCtx.errors && (
                    <div className="bg-red-500/10 text-red-400 p-2 rounded mt-3">
                        {authCtx.errors}
                    </div>
                )}
        </FormInput>
    );
}