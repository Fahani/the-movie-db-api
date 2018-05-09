import React from "react";
import "./Navigation.css";
import Selection from "./Selection";
import Slider from "./Slider";
import Button from "./Button";

class Navigation extends React.Component {
    componentDidMount(){
        fetch(this.props.url)
            .then(response => response.json())
            .then(data => this.props.setGenres(data.genres))
            .catch(error => console.log(error));
    }
    render(){
        const { genre, genres, onGenreChange, onChange, year, rating, runtime} = this.props;
        return(
            <section className="navigation">
                <h3 className="align-center">Search by Title</h3>
                <input className="width100 marginBottom25" value={this.props.searchByTitleInput} onChange={this.props.onChangeInputTitle}/>
                <Button onClick={this.props.onClickSearchByTitle}>
                    Search by Title
                </Button>
                <hr/>
                <h3 className="align-center">Discover Movies</h3>
                <Selection genres={genres} genre={genre} onGenreChange={onGenreChange}/>
                <Slider onChange={onChange} data={year} />
                <Slider onChange={onChange} data={rating} />
                <Slider onChange={onChange} data={runtime} />
                <Button onClick={this.props.onSearchButtonClick}>
                    Discover
                </Button>
            </section>
        );
    }
}

export default Navigation;