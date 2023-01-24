import { Link, useParams } from 'react-router-dom';

export const UserPage = () => {
    const { id } = useParams();
    return ( <div>
        <h1>
            { id } profile
        </h1>
    </div> );
};