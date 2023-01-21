// TODO Create navbar

import { Link } from 'react-router-dom'

export const Navbar = () => {
    // userID = ...
    return (
        <div>
            <Link to="/">
                Home
            </Link>
            {/* <Link to={`/myprofile/:{userID}`}> 
                My profile
            </Link> */}

        </div>
    );
};