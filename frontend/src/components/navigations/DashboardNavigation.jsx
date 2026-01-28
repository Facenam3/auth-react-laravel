import { NavLink } from "react-router-dom";

export default function DashboarNavigation() {

    const active = "text-red-600 text-xl underline mb-1";

    return (
        <aside className="p-3 bg-gray-900 w-1/5 min-h-screen">
            <di className="text-center p-3">
                <ul className="flex flex-col gap-8 text-red-400 text-md">
                    <li>
                        <NavLink to="" end className={({isActive}) => isActive ? active : undefined}>Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="projects" className={({isActive}) => isActive ? active : undefined}>Projects</NavLink>
                    </li>
                    <li>
                        <NavLink to="users" className={({isActive}) => isActive ? active : undefined}>Users</NavLink>
                    </li>
                    <li>
                        <NavLink to="tasks" className={({isActive}) => isActive ? active : undefined}>Tasks</NavLink>
                    </li>
                </ul>
            </di>
        </aside>
    )
}