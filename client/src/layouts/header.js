export const Header = () => {

    const handleLogOut = () => {
        console.log("Log Out")
        // TODO: handleLogOut in header
    }
    // userID = ...
    return (
        <header className="bg-white border-gray-200 shadow">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
                <Link to="/home" className="flex items-center">
                    {/*TODO Logo in header <img src="https://...svg" class="h-6 mr-3 sm:h-9" alt="Logo" /> */}
                    <span className="self-center text-xl font-semibold whitespace-nowrap ">
                        ReaderSHIP
                    </span>
                </Link>
                <div className="flex items-center">
                    <button onClick={ handleLogOut } className="text-sm font-medium text-emerald-600 hover:underline">
                        Log Out
                    </button>
                </div>
            </div>
        </header>

        
    );
};