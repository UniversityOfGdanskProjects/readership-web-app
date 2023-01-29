import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ShelfNav from '../components/shelfs/ShelfsNav';
import { useGlobal } from '../services/context/GlobalContext';

export const ShelfsPage = () => {
        
    return ( <div>
        <ShelfNav />
    </div> );
};