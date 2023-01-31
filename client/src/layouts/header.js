import { Link } from 'react-router-dom'
import { useGlobal } from '../services/context/GlobalContext';

export const Header = () => {
    const {isLoggedIn, toLogOut} = useGlobal();
    const handleLogOut = () => {
        console.log("Log Out")
        toLogOut();
        // TODO: handleLogOut in header
    }
    // userID = ...
    return (
        <header className="bg-white border-gray-200 shadow">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">

                    {/*TODO Logo in header <img src="https://...svg" class="h-6 mr-3 sm:h-9" alt="Logo" /> */}
                    <span className="self-center text-xl font-semibold whitespace-nowrap ">
                        ReaderSHIP
                    </span>

                <div className="flex items-center">
                    {isLoggedIn ? 
                    <button onClick={ handleLogOut } className="text-sm font-medium text-emerald-600 hover:underline">
                        Log Out
                    </button>
                    : ""} 
                </div>
            </div>
        </header>

        
    );
};