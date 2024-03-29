import { Link } from 'react-router-dom'
import { useGlobal } from '../services/context/GlobalContext';

export const Navbar = () => {
    const {isLoggedIn, currentRole} = useGlobal();

    const adminPanel = (<>
        <li>
            <Link to="/users-list"className="hover:underline">
                Users List
            </Link>
        </li>
        <li>
            <Link to="/find-book"className="hover:underline">
                Search Books
            </Link>
            </li>
            <li>
            <Link to="/add-book" className="hover:underline">
                Add Books
            </Link>
        </li>
        </>)

    const userProfile = (
    <>
    <li>
        <Link to="/home" className="hover:underline">
            Home
        </Link>
    </li>
        <li>
            <Link to="/account-settings" className="hover:underline">
                Account
            </Link>
        </li>
        <li>
            <Link to="/shelfs" className="hover:underline">
                Shelves
            </Link>
        </li>
        <li>
            <Link to="/find-book"className="hover:underline">
                Books
            </Link>
        </li>
    </>
    )

    const navLinks = 
    <ul className="flex flex-row mt-0 mr-6 space-x-8 text-lg font-medium">

        {currentRole==="admin" ? adminPanel : userProfile}        
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