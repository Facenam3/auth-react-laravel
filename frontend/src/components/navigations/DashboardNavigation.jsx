import { NavLink } from "react-router-dom";

export default function DashboarNavigation() {
    return (
        <aside className="p-3 bg-gray-900 w-1/5 min-h-screen">
            <di className="text-center p-3">
                <ul className="flex flex-col gap-8 text-red-400 text-md">
                    <li>
                        <NavLink to="" className="hover:text-red-600 hover:text-xl scale-0">Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="projects" className="hover:text-red-600 hover:text-xl scale-0">Projects</NavLink>
                    </li>
                    <li>
                        <NavLink to="users" className="hover:text-red-600 hover:text-xl scale-0">Users</NavLink>
                    </li>
                    <li>
                        <NavLink to="tasks" className="hover:text-red-600 hover:text-xl scale-0">Tasks</NavLink>
                    </li>
                </ul>
            </di>
        </aside>
    )
}