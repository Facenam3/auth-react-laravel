export default function InputGroup({label,name,type, errors, placeholder, ...props}) {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="block mb-3 text-left">{label}</label>
            <input {...props}
                className="bg-white text-gray-950 w-full px-2 py-1 outline-1 outline-blue-300 rounded-md" 
                    type={type} 
                    name={name} 
                    id={name} 
                    required
                    placeholder={placeholder}
            />
                {errors && (
                    <p className="text-red-500 text-sm mt-2">{errors}</p>
                )}
        </div>
    );
}