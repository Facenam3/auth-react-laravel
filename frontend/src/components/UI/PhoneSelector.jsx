import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function PhoneSelector() {
    const [phone, setPhone] = useState(null);
    return (
        <div className="mb-3">
            <label htmlFor="phone" className="block mb-3 text-left">Phone</label>
            <PhoneInput 
            className="bg-gray-50 text-gray-950 w-full px-2 py-1 outline-1 outline-blue-300 rounded-md"
            defaultCountry="mk"
            value={phone}
            onChange={setPhone}
            name="phone"
            placeholder="Enter phone number."
            />
        </div>
    )
}