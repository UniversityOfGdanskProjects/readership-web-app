// import * as dotenv from 'dotenv';
// dotenv.config();

import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShelfsPage } from "../../pages/ShelfsPage";

const GlobalContext = createContext();



export function useGlobal() {
    return useContext(GlobalContext)
};

export function GlobalProvider({ children }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [currentRole, setcurrentRole] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUserID, setCurrentUserID] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentBook, setCurrentBook] = useState(null);
    
    // const users = useSelector(state => state.users);

    const toLogOut = () => {
        setIsLoggedIn(false);
        setcurrentRole(null);
        setCurrentUserID(null);
        setCurrentUser(null)
        navigate("/");
    };
    
    // ok response for login {
        //   isLogin: true,
        //   email: user.email,
        //   firstName: user.firstName,
        //   lastName: user.lastName,
        //   dateOfBirth: user.dateOfBirth,
        //   role: role, admin/user
        //   token,
        //   }
        const loginRequest = (values) => {
            
           
        }

        const toLogIn = (data) => {
            setLoading(true);
            if (data.isLogin) {
            setIsLoggedIn(data.isLogin);
            setcurrentRole(data.role);
            if (data.role !=='admin') {
                setCurrentUserID(data._id);
                setCurrentUser({
                    _id: data._id,
                    firstName: data.firstName, 
                    lastName: data.lastName, 
                    dateOfBirth: data.dateOfBirth,
                    comments: data.comments,
                    email: data.email,
                    username: data.username,
                    shelfs: data.shelfs,
                    ratings: data.ratings

                });         
            };
            setLoading(false);
            return true
        }
        setLoading(false);
        return false
    }
    

   

    
    return (
        <GlobalContext.Provider
            value={{
                loading,
                setLoading,
                toLogIn,
                toLogOut,
                currentUserID,
                isLoggedIn,
                currentRole,
                currentUser,
                setCurrentUser,
                loginRequest, 
                currentBook, 
                setCurrentBook,

            }}
        >
            { children }
        </GlobalContext.Provider>
    );
};