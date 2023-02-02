import {Link, useLocation } from "react-router-dom";

export const NotFoundPage = () => {
  const location = useLocation()
    return (     
    <div>
        <h1>Error 404</h1>
        <h2 className="m-4 text-gray-900">Page not found: {location.pathname}</h2>

        <Link className="all-buttons m-4" to="/">Back to Login</Link>
  </div> );
};
 
