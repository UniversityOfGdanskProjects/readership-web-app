import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ShelfNav from '../components/shelfs/ShelfsNav';
import { useGlobal } from '../services/context/GlobalContext';

export const ShelfsPage = () => {
    const users = useSelector(state => state.users)
    const {currentUserID } = useGlobal();
    const shelfs = users.filter(u => u._id = currentUserID)[0].shelfs
    
    return ( <div>
        <ShelfNav shelfs={shelfs}/>
    </div> );
};