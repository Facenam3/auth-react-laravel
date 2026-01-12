import { Outlet } from "react-router-dom"
import MainNavigation from "../../components/navigations/MainNavigation"


export default function RootLayout() {
    return (
        <>
            <MainNavigation />
            <Outlet />
        </>
    )
}