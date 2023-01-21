// TODO Create navbar

import { Link } from 'react-router-dom'

export const Navbar = () => {

    const handleLogOut = () => {

    }
    // userID = ...
    return (
            <>
            <nav className="bg-white border-gray-200 shadow">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
                    <Link to="/home" className="flex items-center">
                        {/* <img src="https://...svg" class="h-6 mr-3 sm:h-9" alt="Logo" /> */}
                        <span className="self-center text-xl font-semibold whitespace-nowrap ">
                            ReaderSHIP
                        </span>
                    </Link>
                    <div className="flex items-center">
                        <button onClick={handleLogOut} className="text-sm font-medium text-emerald-600 hover:underline">
                            Log Out
                        </button>
                    </div>
                </div>
            </nav>
            <nav className="bg-emerald-600 text-cyan-50 shadow">
                <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
                    <div className="flex items-center">
                        <ul className="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
                            <li>
                                <a href="#" className="hover:underline">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Profile
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Shelf
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Features
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav></>



    );
};