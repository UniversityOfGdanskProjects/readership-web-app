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
    const [currentUserID, setCurrentUserID] = useState(null);
    const [currentUserInfo, setCurrentUserInfo] = useState(null);
    
    // const users = useSelector(state => state.users);

    const toLogOut = () => {
        setIsLoggedIn(false);
        setcurrentRole(null);
        setCurrentUserID(null);
        setCurrentUserInfo(null)
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
        const toLogIn = (data) => {
            if (data.isLogin) {
            setIsLoggedIn(data.isLogin);
            setcurrentRole(data.role);
            if (data.role !=='admin') {
                setCurrentUserID(data._id);
                setCurrentUserInfo({
                    firstName: data.firstName, 
                    lastName: data.lastName, 
                    dateOfBirth: data.dateOfBirth
                });         
            };
            return true
        }
        return false
    }
    
    const loginRequest = async (values) => {
        axios
      .post("http://localhost:4000/api/users/login", values)
      .then((res) => {
        //  ok response { isLogin: true,
        //   email: user.email,
        //   role: role,
        //   token }
        console.log(res);
        if (res.data.isLogin) {
          toLogIn(res.data);
          navigate("/home");
        } else {
          return("Niepoprawne logowanie!");
        }
      })
      .catch((err) => {
        console.log(err);
        return("Coś poszło nie tak!");
      });
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
                currentUserInfo,
                loginRequest, 
            }}
        >
            { children }
        </GlobalContext.Provider>
    );
};