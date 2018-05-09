import React from "react";
import {BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./header/Header";
import Main from "./main/Main";
import Movie from "./main/movie/Movie";
import NotFound from "./NotFound";

const App = () => {
    return(
        <BrowserRouter>
            <div>
                <Header/>
                <Switch>
                    <Route exact path='/' component={Main}/>
                    <Route path="/movies/:movieId" component={Movie}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;