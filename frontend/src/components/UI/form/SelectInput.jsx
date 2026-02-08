export default function SelectInput({option1, option2, label, name, erorrs}) {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="block mb-3 text-left">{label}</label>
            <select 
                className="bg-gray-50 text-gray-950 w-full px-2 py-1 outline-1 outline-blue-300 rounded-md"  
                name={name} 
                id={name}
                required
            >
            <option selected disabled>Select gender</option>
                <option value={option1}>{option1}</option>
                <option value={option2}>{option2}</option>
            </select>
            {erorrs && (
                <p className="text-red-500 text-sm mt-2">{erorrs}</p>
            )}
        </div>
    );
}