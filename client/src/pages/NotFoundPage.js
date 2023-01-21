import {Link, useLocation } from "react-router-dom";

export const NotFoundPage = () => {
  const location = useLocation()
    return (     
    <div>
        <h1>Error 404</h1>
        <h2>Page not found: {location.pathname}</h2>
        <Link  to="/home">Back to Home Page</Link>
  </div> );
};
 
