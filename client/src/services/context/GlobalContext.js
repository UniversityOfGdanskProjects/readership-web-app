// import * as dotenv from 'dotenv';
// dotenv.config();
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';

const GlobalContext = createContext();

export function useGlobal() {
    return useContext(GlobalContext)
};

export function GlobalProvider({ children }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [currentRole, setcurrentRole] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    
    // const users = useSelector(state => state.users);

    const toLogOut = () => {
        setIsLoggedIn(false);
        setcurrentRole(null);
        setCurrentUser(null);
        navigate("/");
    };

    // ok response for login {
    //   isLogin: true,
    //   email: user.email,
    //   role: role, admin/user
    //   token,
    //   }
    const toLogIn = (data) => {
        if (data.isLogin) {
            setIsLoggedIn(data.isLogin);
            setcurrentRole(data.role);
            setCurrentUser(data.email);
            return true
        }
        return false
    }

    return (
        <GlobalContext.Provider
            value={{
                loading,
                setLoading,
                toLogIn,
                toLogOut,
                currentUser,
                isLoggedIn,
                currentRole
            }}
        >
            { children }
        </GlobalContext.Provider>
    );
};