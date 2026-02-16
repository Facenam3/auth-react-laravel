import { useState, useContext } from "react";
import { useNavigate } from "react-router";

import CountrySelector from "../../components/UI/form/CountrySelector.jsx";
import PhoneSelector from "../../components/UI/form/PhoneSelector.jsx";
import { validateRegister } from "../../validators/register.js";
import UserContext from "../../store/contexts/UserContext.jsx";
import InputGroup from "../../components/UI/form/Input.jsx";
import ButtonSubmit from "../../components/UI/form/ButtonSubmit.jsx";
import FormInput from "../../components/UI/form/FormInput.jsx";
import SelectInput from "../../components/UI/form/SelectInput.jsx";

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
        <FormInput pageName="Register Page" onSubmit={handleRegisterSubmit}>
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
                <SelectInput
                    label="Gender"
                    name="gender"
                    placeholder="Select Gender"
                    errors={formErrors.gender}
                    required
                    options={[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                    ]}
                />
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
        </FormInput> 
    )
}