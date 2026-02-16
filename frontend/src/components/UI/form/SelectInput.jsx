export default function SelectInput({
    label, 
    name,
    options = [],
    placeholder = "Select an option", 
    erorrs,
    required = false,
    cssClasses = "mb-3",
    ...props
    }) {
    return (
        <div className={cssClasses}>
            {label && <label htmlFor={name} className="block mb-3 text-left">{label}</label>}
            <select 
                {...props}
                className="bg-gray-50 text-gray-950 w-full px-2 py-1 outline-1 outline-blue-300 rounded-md"   
                name={name} 
                id={name}
                required={required}
                defaultValue=""
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
            </select>

            {erorrs && (
                <p className="text-red-500 text-sm mt-2">{erorrs}</p>
            )}
        </div>
    );
}