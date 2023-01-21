import { Link, useParams } from 'react-router-dom';

export const ShelfsPage = () => {
    const {id} = useParams();
    return ( <div>
        <h1>
            Shelf - {id}
        </h1>
        <ul>List of shelfs</ul>
        <ul>Books on current shelf</ul>
    </div> );
};