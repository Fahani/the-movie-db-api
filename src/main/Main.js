import React from "react";
import "./Main.css";
import Navigation from "./navigation/Navigation";
import Movies from "./movies/Movies";

class Main extends React.Component {
    state = {
        total_pages: 1,
        movies: [],
        page: 1,
        genre: 'Comedy',
        genres: [],
        year: {
            label: "year",
            min: 1990,
            max: 2017,
            step: 1,
            value: { min: 2000, max: 2017 }
        },
        rating: {
            label: "rating",
            min: 0,
            max: 10,
            step: 1,
            value: { min: 8, max: 10 }
        },
        runtime: {
            label: "runtime",
            min: 0,
            max: 300,
            step: 15,
            value: { min: 60, max: 120 }
        },
        searchByTitleInput: "",
        url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`,
        moviesUrl: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
    };

    onGenreChange = event =>
    {
        this.setState({genre: event.target.value})
    };

    onChange = data => {
        this.setState(
            {
                [data.type]: {
                    ...this.state[data.type], // ...this.state -> previous state. We are telling to keep the same type
                    value: data.value // Value set for the user in Slider.js
                }
            }
        );
    };

    setGenres = genres => {this.setState({genres})};





    generateUrl = params => {
        const {page, genres, year, rating, runtime} = params;
        const selectedGenre = genres.find( genre => genre.name === params.genre);
        const genreId = selectedGenre.id;

        const moviesUrl = `https://api.themoviedb.org/3/discover/movie?` +
            `api_key=${process.env.REACT_APP_TMDB_API_KEY}&` +
            `language=en-US&sort_by=popularity.desc&` +
            `with_genres=${genreId}&` +
            `primary_release_date.gte=${year.value.min}-01-01&` +
            `primary_release_date.lte=${year.value.max}-12-31&` +
            `vote_average.gte=${rating.value.min}&` +
            `vote_average.lte=${rating.value.max}&` +
            `with_runtime.gte=${runtime.value.min}&` +
            `with_runtime.lte=${runtime.value.max}&` +
            `page=${page}&`;

        this.setState({ moviesUrl });
    };

    onSearchButtonClick = () => {
        this.setState({page: 1, searchByTitleInput: ''});
        this.generateUrl(this.state);
    };

    storeMovies = data => {
        const movies = data.results.map( result => {
            const  { vote_count, id, genre_ids, poster_path, title, vote_average, release_date } = result;
            return { vote_count, id, genre_ids, poster_path, title, vote_average, release_date };
        });

        this.setState({ movies, total_pages: data.total_pages })
    };

    fetchMovies = (url) => {
        fetch(url)
            .then(response => response.json())
            .then(data => this.storeMovies(data))
            .catch(error => console.log(error));
    };

    componentDidMount(){
        const savedState = this.getStateFromLocalStorage();
        if ( !savedState || (savedState && !savedState.movies.length)) {
            this.fetchMovies(this.state.moviesUrl);
        } else {
            this.setState({ ...savedState });
            this.generateUrl(savedState);
        }
    }

    componentWillUpdate(nextProps, nextState) {
        this.saveStateToLocalStorage();
        if (this.state.moviesUrl !== nextState.moviesUrl) {
            this.fetchMovies(nextState.moviesUrl);
        }

        if (this.state.page !== nextState.page) {
            if(nextState.searchByTitleInput !== "")
                this.generateSearchUrl(nextState);
            else
                this.generateUrl(nextState);
        }
    }

    onPageIncrease = () => {
        const { page, total_pages } = this.state;
        const nextPage = page + 1;
        if (nextPage <= total_pages) {
            this.setState({ page: nextPage })
        }
    };

    onPageDecrease = () => {
        const { page } = this.state;
        const nextPage = page - 1;
        if ( nextPage > 0 ) {
            this.setState({ page: nextPage })
        }
    };


    saveStateToLocalStorage = () => {
        localStorage.setItem("sweetpumpkins.params", JSON.stringify(this.state));
    };

    getStateFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem("sweetpumpkins.params"));
    };


    // --> >Search by title

    generateSearchUrl = (params) => {
        const {page, searchByTitleInput} = params;
        const moviesUrl = `https://api.themoviedb.org/3/search/movie?` +
            `api_key=${process.env.REACT_APP_TMDB_API_KEY}&` +
            `query=${encodeURIComponent(searchByTitleInput)}&` +
            `language=en-US&page=${page}&include_adult=false`;

        this.setState({ moviesUrl });
    };

    onChangeInputTitle = (event) => {
      this.setState({searchByTitleInput : event.target.value})
    };

    onClickSearchByTitle = () => {
      this.setState({page: 1});
      this.generateSearchUrl(this.state)
    };

    // <-- Search by title

    render(){
        return(
            <section className="main">
                <Navigation
                    onChange={this.onChange}
                    onGenreChange={this.onGenreChange}
                    {...this.state}
                    setGenres={this.setGenres}
                    onSearchButtonClick={this.onSearchButtonClick}

                    searchByTitleInput={this.state.searchByTitleInput}
                    onChangeInputTitle={this.onChangeInputTitle}
                    onClickSearchByTitle={this.onClickSearchByTitle}
                />
                <Movies
                    movies={this.state.movies}
                    page={this.state.page}
                    onPageIncrease={this.onPageIncrease}
                    onPageDecrease={this.onPageDecrease}/>
            </section>
        );
    };
}

export default Main;