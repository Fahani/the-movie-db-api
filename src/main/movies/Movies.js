import React from "react";
import "./Movies.css";
import MovieListItem from "./MovieListItem";
import Button from "../navigation/Button";

const Movies = ({movies, page, onPageIncrease, onPageDecrease}) =>(
    <section>
        <ul className="movies">
            {movies.map( movie => (<MovieListItem key={movie.id} movie={movie} />))}
        </ul>
        <div className="pagination">
            {page !== 1 ? <Button onClick={onPageDecrease}>Previous</Button> : <span/>}
            <span>{`Page ${page}`}</span>
            <Button onClick={onPageIncrease}>Next</Button>
        </div>
    </section>
);
export default Movies;