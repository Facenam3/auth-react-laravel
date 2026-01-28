import { useMemo, useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

export default function CountrySelector() {
    const options = useMemo(() => countryList().getData(), []);
    const [country, setCountry] = useState(null);

    return (
        <div className="mb-3 ">
            <label htmlFor="country" className="block mb-3 text-left text-gray-50">Country</label>
            <Select
                options={options}
                value={country}
                onChange={setCountry}
                placeholder="Select a country"
                className="text-gray-950"
                classNamePrefix="custom-select"
                name="country"
            />
        </div>
    )

}