// TODO Create navbar

import { Link } from 'react-router-dom'
import { useGlobal } from '../services/context/GlobalContext';

export const Navbar = () => {
    const {isLoggedIn} = useGlobal();

    const navLinks = 
    <ul className="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
        <li>
            <Link to="/home" className="hover:underline">
                Home
            </Link>
        </li>
        <li>
            <Link to="/my-profile" className="hover:underline">
                Profile
            </Link>
        </li>
        <li>
            <Link to="/home" className="hover:underline">
                Shelfs
            </Link>
        </li>
        <li>
            <Link to="/home"className="hover:underline">
                Features
            </Link>
        </li>
    </ul>


    return (
            <>
            <nav className="bg-emerald-600 text-cyan-50 shadow">
                <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
                    <div className="flex items-center">
                        {isLoggedIn ? navLinks : ""}
                    </div>
                </div>
            </nav></>



    );
};