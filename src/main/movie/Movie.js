import React from "react";
import "./Movie.css";
import {Link} from "react-router-dom";
import LoadingMovie from "../movies/LoadingMovie";

class Movie extends React.Component {
    state = {
        movie: [],
        isLoading: true
    };

    componentDidMount(){
        const {movieId} = this.props.match.params;
        const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
        fetch(movieUrl)
            .then(response => response.json())
            .then(data => this.setState({movie: data, isLoading: false}))
            .catch(error => console.log("Error", error));
    }

    render()
    {
        const {title, backdrop_path, release_date, genres, overview, vote_average, runtime} = this.state.movie;
        const releaseYear = release_date ? release_date.substring(0,4):null;
        const {isLoading} = this.state;

        const backdropImage = {backgroundImage: `url(http://image.tmdb.org/t/p/w1280/${backdrop_path})`};
        return(
            <div className="movie-page">
                {isLoading?<LoadingMovie/>:
                <div>
                    <div className="movie-image" style={backdropImage}/>
                    <div className="movie-details">
                        <Link to="/" className="genres">Back to the list</Link>{/*Not in the course*/}
                        <h1>{title}<span>({releaseYear})</span></h1>
                        <section className="genres">
                            {genres.map( (genre, index) => (
                                <div key={genre.id}>
                                    <span>{genre.name}</span>
                                    {index < genres.length - 1 && (<span className="separator">|</span>)} {/*Every genre, except the last one, should have a | on its right. Therefore, we are checking if we have reached the end of the genres array: index < genres.length - 1.
                                                                                                             Next, we use the && logical operator to decide if we should display the separator. To display the component only when a certain condition is met we can use this technique:*/}
                                </div>
                            ) )}
                        </section>
                        <h5>Rating: <span>{vote_average}</span></h5>
                        <h5>Runtime: <span>{runtime} min</span></h5>
                        <h4>Overview</h4>
                        <p>{overview}</p>
                    </div>
                </div>
        }</div>);
    }
}

export default Movie;