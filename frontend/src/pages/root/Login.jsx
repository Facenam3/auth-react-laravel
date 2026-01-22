import { useContext } from "react";
import AuthContext from "../../store/contexts/AuthContext.jsx";

export default function LoginPage() {
    const authCtx = useContext(AuthContext);

    function handleLoginSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="max-w-1/6 p-4 mt-10 mx-auto ">
            <h1 className="text-center mb-5 font-bold text-3xl text-blue-700">Login Page</h1>
            <form onSubmit={handleLoginSubmit} className="p-5 text-center bg-amber-50 rounded-md border-2 border-blue-950">
                <div className="mb-3">
                    <label htmlFor="email" className="block mb-3 text-left">Email</label>
                    <input className="bg-white w-full px-2 py-1 outline-1 outline-blue-300 rounded-md" type="email" name="email" id="email" placeholder="Johndoe@example.com"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="block mb-3 text-left">Password</label>
                    <input className="bg-gray-50 w-full px-2 py-1 outline-1 outline-blue-300 rounded-md" type="password" name="password" id="password" />
                </div>
                <div className="flex justify-center items-center">
                    <button 
                    className="px-2.5 py-1.5 rounded-md text-center bg-cyan-500 text-gray-50 border-2 border-blue-900 hover:bg-blue-700 hover:text-gray-100" 
                    type="submit"
                    >Login</button>
                </div>
            </form>
        </div>
    );
}