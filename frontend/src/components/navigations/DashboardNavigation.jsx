import { NavLink } from "react-router-dom"

export default function DashboarNavigation() {
    return (
        <aside className="p-3 bg-blue-900 text-gray-50 w-1/5 min-h-screen">
            <div className="text-center p-3">
                <ul className="flex flex-col gap-3 text-amber-300">
                    <li>
                        <NavLink to="">Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="projects">Projects</NavLink>
                    </li>
                    <li>
                        <NavLink to="users">Users</NavLink>
                    </li>
                    <li>
                        <NavLink to="tasks">Tasks</NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    )
}