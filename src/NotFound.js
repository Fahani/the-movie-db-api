import React from "react";
import {Link} from "react-router-dom";
const NotFound = () => (
    <div>
        <h3>We couldn't find what your are looking for :(</h3>
        <Link to="/">Here you can browse the movies</Link>
    </div>
);
export default NotFound;