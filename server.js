const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

//lab13
const { Client } = require('pg');
// const url = 'postgres://moayad:2001@localhost:5432/movieslibrary'

//lab15
const url = process.env.DATABASE_URL;

const client = new Client(url);

const PORT = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

//app lab13
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// routes
app.get('/', homePageHandler);//lab11
app.get('/favorite', favoriteHandler);//lab11
app.get('/trending', trendingHandler);//lab12
app.get('/search', searchHandler);//lab12
app.get('/top-rated', topRatedHandler);//lab12
app.get('/upcoming', upcomingHandler);//lab12
app.post('/addMovie', addMovieHandler)//lab13
app.get('/getMovies', getMoviesHandler);//lab13
app.put('/updateMovie/:id', updateMovieHandler);//lab14
app.delete('/deleteMovie/:id', deleteMovieHandler);//lab14
app.get('/getMovie/:id', getMovieHandler);//lab14



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

//Post movie (Add movie) function lab13
function addMovieHandler(req, res) {
    console.log(req.body)
    const {original_title, release_date, poster_path, overview, comment }= req.body 
    const  sql = `INSERT INTO movietable(original_title, release_date, poster_path, overview, comment )
    VALUES ($1, $2, $3, $4, $5) RETURNING *;`
    const values = [original_title, release_date, poster_path, overview, comment] 
    client.query(sql, values).then((reuslt)=>{
        console.log(reuslt.rows)
        res.status(201).json(reuslt.rows)
    }).catch(((error) =>{
        errorHandler(error, req, res);
    }))
}
//get movies function lab13
function getMoviesHandler(req,res){
    const sql = `SELECT * FROM movietable;`
    client.query(sql).then((reuslt)=>{
        const data = reuslt.rows
        res.json(data)

    })
    .catch()

}
//update movie function lab14
function updateMovieHandler(req,res){
    const id = req.params.id
    const {original_title, release_date, poster_path, overview, comment }= req.body 
    const  sql = `UPDATE movietable SET original_title=$1, release_date=$2, poster_path=$3, overview=$4, comment=$5 WHERE id= ${id} RETURNING *;`
    const values = [original_title,release_date,poster_path,overview,comment] 
    client.query(sql, values).then((reuslt)=>{
        console.log(reuslt.rows)
        res.status(200).json(reuslt.rows)
    }).catch(((error) =>{
        errorHandler(error, req, res);
    }))
}
//delete movie function lab14
function deleteMovieHandler(req,res){
    const id = req.params.id
    const  sql = `DELETE FROM movietable WHERE id= ${id} RETURNING *;`
    client.query(sql).then((reuslt)=>{
        console.log(reuslt.rows)
        res.status(204).json(reuslt.rows)
    }).catch(((error) =>{
        errorHandler(error, req, res);
    }))
}
//get movie function lab14
function getMovieHandler(req,res){
    const id = req.params.id;
    const sql=`SELECT * FROM movietable WHERE id = ${id} ;`
    client.query(sql).then((reuslt)=>{
        console.log(reuslt.rows)
        res.status(200).json(reuslt.rows)
    }).catch(((error) =>{
        errorHandler(error, req, res);
    }))
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
// app.listen(PORT);



// Start the server for lab13 client connect
client.connect().then(()=>{

    app.listen(PORT, ()=>{
    console.log(`listening to port ${PORT}`);
    })
}

 ).catch()
