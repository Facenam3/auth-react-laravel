import { NavLink } from "react-router-dom";

export default function DashLink({name, direction , sign}) {
    const active = "text-red-600 px-24 rounded-md py-2 border bg-white/10 border-white/50 mb-1";

    return (
        <li>
            <NavLink to={direction} end className={({isActive}) => isActive ? active : undefined}>
                {sign}
                {name}
            </NavLink>
        </li>
    );
}