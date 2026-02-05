import { NavLink } from "react-router-dom";

export default function DashboarNavigation() {

    const active = "text-red-600 px-24 rounded-md py-2 border bg-white/10 border-white/50 mb-1";

    return (
        <aside className="p-3 bg-gray-900 w-1/5 min-h-screen border-r border-white/30">
            <div className="text-center p-3">
                <ul className="flex flex-col gap-8 text-gray-50 text-md">
                    <li>
                        <NavLink to="" end className={({isActive}) => isActive ? active : undefined}>
                            <i class="fa-solid fa-chart-line mr-2"></i>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="users" className={({isActive}) => isActive ? active : undefined}>
                            <i class="fa-solid fa-users mr-2"></i>
                            Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="projects" className={({isActive}) => isActive ? active : undefined}>
                            <i class="fa-solid fa-diagram-project mr-2"></i>
                            Projects
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="tasks" className={({isActive}) => isActive ? active : undefined}>
                            <i class="fa-solid fa-list-check mr-2"></i>
                            Tasks
                        </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    )
}