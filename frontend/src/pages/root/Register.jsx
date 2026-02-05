import { useState, useContext } from "react";
import { useNavigate } from "react-router";

import CountrySelector from "../../components/UI/CountrySelector.jsx";
import GlassmorphicCard from "../../components/UI/GlassmorphicCard.jsx";
import PhoneSelector from "../../components/UI/PhoneSelector.jsx";
import { validateRegister } from "../../validators/register.js";
import UserContext from "../../store/contexts/UserContext.jsx";
import InputGroup from "../../components/UI/Input.jsx";
import ButtonSubmit from "../../components/UI/ButtonSubmit.jsx";

export default function RegisterPage() {
    const userCtx = useContext(UserContext);
    const navigate = useNavigate();

    const [formErrors, setFormErrors] = useState({});

    async function handleRegisterSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());

        const errors = validateRegister(data);

        if(Object.keys(errors).length > 0){
            setFormErrors(errors);
            return;
        }

        setFormErrors({});
        const res = await userCtx.register(data);
        
        if(res.success) {
            navigate("/login", {
                state: {
                    success: "Registration successfull. Please log in."
                }
            });
        }
    }
    return (
        <>
            <GlassmorphicCard>
                <h1 className="text-center mb-5 font-bold text-3xl text-rose-700">Register Page</h1>
                <form onSubmit={handleRegisterSubmit} className="p-5 text-center rounded-md border-2 border-rose-950">
                    <InputGroup 
                        label="Full name"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        errors={formErrors.name}
                    />
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
                        placeholder="Password min length is 6 chars."
                        errors={formErrors.password}
                    />
                            
                    <CountrySelector />
                    {formErrors.country && (
                        <p className="text-red-500 text-sm mt-2">{formErrors.country}</p>
                    )}
                    <InputGroup 
                        label="Adress"
                        type="text"
                        name="adress"
                        placeholder="Your home adress."
                        errors={formErrors.adress}
                    />
                    <PhoneSelector />
                    {formErrors.phone && (
                        <p className="text-red-500 text-sm mt-2">{formErrors.phone}</p>
                    )}
                    <div className="mb-3">
                        <label htmlFor="gender" className="block mb-3 text-left">Gender</label>
                        <select 
                            className="bg-gray-50 text-gray-950 w-full px-2 py-1 outline-1 outline-blue-300 rounded-md"  
                            name="gender" id="gender"
                            required>
                            <option selected disabled>Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        {formErrors.gender && (
                            <p className="text-red-500 text-sm mt-2">{formErrors.gender}</p>
                        )}
                    </div>
                    <div className="flex justify-center items-center">
                        <ButtonSubmit
                            name="Register"
                            type="submit"
                        />                  
                    </div>
                    {userCtx.errors && (
                        <div className="bg-red-500/10 text-red-400 p-2 rounded mt-3">
                            {userCtx.errors}
                        </div>
                    )}
                </form>
            </GlassmorphicCard>
        </>        
    )
}