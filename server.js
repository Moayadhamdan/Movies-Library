const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());


function Movie(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
}


app.get('/', (req, res) => {

    const sampleMovie = new Movie(
        "Spider-Man: No Way Home",
        "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man."
    );
    res.json(sampleMovie);
});

app.get('/favorite', (req, res) => {
    res.send("Welcome to Favorite Page");
});


app.use((req, res, next) => {
    res.status(404).json({
        status: 404,
        responseText: "Page not found"
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 500,
        responseText: "Sorry, something went wrong"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
