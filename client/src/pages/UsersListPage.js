import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";

export const UsersListPage = () => {
    const users = useSelector((state) => state.users);
        

    return ( <div>
        
        
    </div> );
};