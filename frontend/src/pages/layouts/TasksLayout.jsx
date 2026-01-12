import { Outlet } from "react-router-dom";

import DashboarNavigation from "../../components/navigations/DashboardNavigation.jsx";

export default function TasksLayout() {
    return (
      <>
        <main className="flex gap-1">
            <DashboarNavigation />
            <Outlet />
        </main>
      </>
    )
}