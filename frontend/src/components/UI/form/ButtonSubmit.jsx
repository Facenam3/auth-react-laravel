export default function ButtonSubmit({ name, type, ...props}) {
    return (
            <button {...props}
                className="px-2.5 py-1.5 rounded-md text-center bg-rose-500 text-gray-50 border-2 border-red-900 hover:bg-red-700 hover:text-gray-100" 
                type={type}
            >
                {name}
            </button>
    );
}