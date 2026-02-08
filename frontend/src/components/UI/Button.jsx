export default function Button({name,type, ...props}) {
   return (
            <button {...props}
                className="px-2.5 py-1.5 rounded-md text-center bg-green-500 text-gray-150 border-2 border-green-900 hover:bg-green-700 hover:text-gray-50" 
                type={type}
            >
                {name}
            </button>
    );
}