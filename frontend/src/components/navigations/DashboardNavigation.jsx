import DashLink from "../UI/DashLink";

export default function DashboarNavigation() {

    return (
        <aside className="p-3 bg-gray-900 w-1/5 min-h-screen border-r border-white/30">
            <div className="text-center p-3">
                <ul className="flex flex-col gap-8 text-gray-50 text-md">
                    <DashLink 
                        name="Dashboard"
                        sign={<i class="fa-solid fa-chart-line mr-2"></i>}
                        direction=""
                    />
                    <DashLink 
                        name="Users"
                        sign={<i class="fa-solid fa-users mr-2"></i>}
                        direction="users"
                    />
                    <DashLink 
                        name="Projects"
                        sign={<i class="fa-solid fa-diagram-project mr-2"></i>}
                        direction="projects"
                    />
                    <DashLink 
                        name="Tasks"
                        sign={<i class="fa-solid fa-list-check mr-2"></i>}
                        direction="tasks"
                    />
                </ul>
            </div>
        </aside>
    )
}