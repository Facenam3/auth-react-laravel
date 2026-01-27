import { Outlet } from "react-router-dom"
import MainNavigation from "../../components/navigations/MainNavigation"


export default function RootLayout() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-900 via-slate-900 to-gray-950 text-gray-100">
            <MainNavigation />
            <Outlet />
        </div>
    )
}