import React from "react";
import "./MovieListItem.css";
import {Link} from "react-router-dom";

const MovieListItem = ({movie}) => {
    const {id, title, poster_path, release_date, vote_average} = movie;
    const imgUrl = `https://image.tmdb.org/t/p/w342/${poster_path}`;
    const year = release_date.substring(0,4);
    return(
        <li className="movie-item">
            <Link to={`/movies/${id}`} className="thumbnail">
                <img src={imgUrl} alt={title} />
                <div className="movie-description">
                    <h2>{title}</h2>
                    <section className="movie-details">
                        <div className="movie-year">
                            <span className="title">Year</span>
                            <span>{year}</span>
                        </div>
                        <div className="movie-rating">
                            <span className="title">Rating</span>
                            <span>{vote_average}</span>
                        </div>
                    </section>
                </div>
            </Link>
        </li>
    );
};
export default MovieListItem;