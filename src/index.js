//The react package contains all React functionalities. The react-dom package is responsible for rendering elements on the DOM. And you need both to build a React app.
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";

ReactDOM.render(<App/>, document.getElementById('root'));