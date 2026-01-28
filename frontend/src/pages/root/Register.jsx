import { useState } from "react";
import CountrySelector from "../../components/UI/CountrySelector.jsx";
import GlassmorphicCard from "../../components/UI/GlassmorphicCard.jsx";
import PhoneSelector from "../../components/UI/PhoneSelector.jsx";
import { validateRegister } from "../../validators/regisater.js";

export default function RegisterPage() {
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

    }
    return (
        <GlassmorphicCard>
                    <h1 className="text-center mb-5 font-bold text-3xl text-rose-700">Register Page</h1>
                    <form onSubmit={handleRegisterSubmit} className="p-5 text-center rounded-md border-2 border-rose-950">
                        <div className="mb-3">
                            <label htmlFor="name" className="block mb-3 text-left">Full name</label>
                            <input 
                            className="bg-white text-gray-950 w-full px-2 py-1 outline-1 outline-blue-300 rounded-md" 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="John Doe"
                            />
                            {formErrors.name && (
                                <p className="text-red-500 text-sm mt-2">{formErrors.name}</p>
                            )}
                        </div>
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
                            placeholder="Password minimum length is 6 chars."
                            />
                            {formErrors.password && (
                                <p className="text-red-500 text-sm mt-2">{formErrors.password}</p>
                            )}
                        </div>

                        <CountrySelector />
                        {formErrors.country && (
                            <p className="text-red-500 text-sm mt-2">{formErrors.country}</p>
                        )}
                        
                        <div className="mb-3">
                            <label htmlFor="adress" className="block mb-3 text-left">Adress</label>
                            <input 
                            className="bg-gray-50 text-gray-950 w-full px-2 py-1 outline-1 outline-blue-300 rounded-md" 
                            type="text" 
                            name="adress" 
                            id="adress" 
                            placeholder="London"
                            />
                            {formErrors.adress && (
                                <p className="text-red-500 text-sm mt-2">{formErrors.adress}</p>
                            )}
                        </div>
                        <PhoneSelector />
                            {formErrors.phone && (
                                <p className="text-red-500 text-sm mt-2">{formErrors.phone}</p>
                            )}
                        <div className="mb-3">
                            <label htmlFor="gender" className="block mb-3 text-left">Gender</label>
                            <select className="bg-gray-50 text-gray-950 w-full px-2 py-1 outline-1 outline-blue-300 rounded-md"  name="gender" id="gender">
                                <option selected disabled>Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            {formErrors.gender && (
                                <p className="text-red-500 text-sm mt-2">{formErrors.gender}</p>
                            )}
                        </div>
                        <div className="flex justify-center items-center">
                            <button 
                            className="px-2.5 py-1.5 rounded-md text-center bg-rose-500 text-gray-50 border-2 border-red-900 hover:bg-red-700 hover:text-gray-100" 
                            type="submit"
                            >
                            Register
                            </button>                    
                        </div>
                        {/* {authCtx.errors && (
                            <div className="bg-red-500/10 text-red-400 p-2 rounded mt-3">
                                {authCtx.errors}
                            </div>
                        )} */}
                    </form>
                </GlassmorphicCard>
    )
}