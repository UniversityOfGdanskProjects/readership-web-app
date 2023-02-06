import { LoginForm } from '../components/login/LoginForm';
import {useEffect, useState} from "react";
import axios from 'axios';

export const LoginPage = () => {
    const [usersAmount, setUsersAmount] = useState(null);
    
    useEffect(()=> {
        axios.get("http://localhost:4000/api/users/amount").then(res => {
            console.log(res.data);
            setUsersAmount(res.data[0].userAmount);
        });

    }, [])
    return ( <div>
        <h1>Welcome in ReaderSHIP - website to search books!</h1>
        <h1>Users amount: {usersAmount}</h1>
        <LoginForm />
    </div> );
};
 
