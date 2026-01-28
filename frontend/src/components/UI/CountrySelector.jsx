import { useState } from "react";
import { CountrySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css"

export default function CountrySelector() {
    const [country, setCountry] = useState(null);

    return (
        <div className="mb-3 text-gray-950">
            <label htmlFor="country" className="block mb-3 text-left text-gray-50">Country</label>
            <CountrySelect 
            className="w-full bg-white"
            onChange={setCountry}
            value={country}
            name="country"
            id="country"            
            />
        </div>
    )
    
}