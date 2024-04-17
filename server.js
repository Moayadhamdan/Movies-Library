const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const PORT = 3000;
const apiKey = process.env.API_KEY;

// routes
app.get('/', homePageHandler);
app.get('/favorite', favoriteHandler);
app.get('/trending', trendingHandler);
app.get('/search', searchHandler);
app.get('/top-rated', topRatedHandler);
app.get('/upcoming', upcomingHandler);

// function for creating movie objects MovieLab11
class MovieLab11 {
    constructor(title, poster_path, overview) {
        this.title = title;
        this.poster_path = poster_path;
        this.overview = overview;
    }
}

// function for trending movie object MovieLab12
class MovieLab12 {
    constructor(id, title, release_date, poster_path, overview) {
        this.id = id;
        this.title = title;
        this.release_date = release_date;
        this.poster_path = poster_path;
        this.overview = overview;
    }
}

// Data from JSON
const dataFromJson = require('./Movie Data/data.json');

// Sample movie data MovieLab11
const spiderMan = new MovieLab11(
    dataFromJson.title,
    dataFromJson.poster_path,
    dataFromJson.overview
);

// Home page function
function homePageHandler(req, res) {
    res.json(spiderMan);
}

// Favorite Page function
function favoriteHandler(req, res) {
    res.send('Welcome to Favorite Page');
}

// Trending Page function
function trendingHandler(req, res) {
    let url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`;
    axios.get(url)
        .then(result => {
            console.log(result.data.results);
            let movieData = result.data.results.map(movie => {
                return new MovieLab12(movie.id, movie.title, movie.release_date, movie.poster_path, movie.overview);
            });
            res.json(movieData);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        });
}

// Search Page function
function searchHandler(req, res) {
    let movieName = req.query.title;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieName}&page=2`;
    axios.get(url)
        .then(result => {
            console.log(result.data.results);
            let response = result.data.results;
            res.json(response);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        });
}

// Top Rated Page function
function topRatedHandler(req, res) {
    let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;
    axios.get(url)
        .then(result => {
            console.log(result.data.results);
            let response = result.data.results;
            res.json(response);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        });
}

// Upcoming Page function
function upcomingHandler(req, res) {
    let url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;
    axios.get(url)
        .then(result => {
            console.log(result.data.results);
            let response = result.data.results;
            res.json(response);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        });
}

// Error handling middleware for 404 - Page Not Found
app.use((req, res, next) => {
    res.status(404).json({ status: 404, responseText: 'Page not found' });
});

// Error handling middleware for 500 - Internal Server Error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: 500, responseText: 'Sorry, something went wrong' });
});

// Start the server
app.listen(PORT);
