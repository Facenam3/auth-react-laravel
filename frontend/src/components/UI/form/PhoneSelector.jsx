import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function PhoneSelector() {
    const [phone, setPhone] = useState(null);
    return (
        <div className="mb-3">
            <label htmlFor="phone" className="block mb-3 text-left">Phone</label>
            <PhoneInput 
            defaultCountry="MK"
            className="bg-gray-50 text-gray-950 w-full px-2 py-1 outline-1 outline-blue-300 rounded-md"
            value={phone}
            onChange={setPhone}
            name="phone"
            required
            placeholder="Enter phone number."
            />
        </div>
    )
}