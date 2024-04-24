# Movies Library App - v1.0.0

**Author Name**: [Moayad Hamdan](https://github.com/Moayadhamdan)

## WRRC
LAB11:

![WRRC(LAB11) Image](WRRC(lab11).png)

LAB12:

![WRRC(LAB12) Image](WRRC(lab12).png)

LAB13:

![WRRC(LAB13) Image](WRRC(lab13).png)

LAB14:

![WRRC(LAB14) Image](WRRC(lab14).png)


## Overview
This project is a movie library app that allows users to browse the latest movies based on categories.

## Getting Started
To build and run this app on your machine, follow these steps:

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/your-username/Movies-Library.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Movies-Library
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Set up your API key:

    - Create a `.env` file in the root directory of the project.
    - Inside the `.env` file, add your API key as follows:

      ```plaintext
      API_KEY=your_api_key_here
      ```

5. Start the server:

    ```bash
    npm start
    ```

6. Open your web browser and go to the following address:

    [http://localhost:3000/](http://localhost:3000/)

7. You should now see the home page of the Movies Library app.

## Project Features
- **Home Page Endpoint:** `/`
  - Displays the latest movies with details.
  
- **Favorite Page Endpoint:** `/favorite`
  - Displays a welcome message for the favorite page.
  
- **Trending Page Endpoint:** `/trending`
  - Fetches and displays trending movies of the week.
  
- **Search Page Endpoint:** `/search`
  - Allows users to search for movies based on the provided query.
  
- **Top Rated Page Endpoint:** `/top-rated`
  - Fetches and displays top-rated movies.
  
- **Upcoming Page Endpoint:** `/upcoming`
  - Fetches and displays upcoming movies.
  
- **Add Movie Endpoint:** `/addMovie`
  - Allows users to add movies to the database.

- **Get Movies Endpoint:** `/getMovies`
  - Fetches and displays all movies from the database.

- **Update Movie Endpoint:** `/updateMovie/:id`
  - Allows users to update movie by id details.

- **Delete Movie Endpoint:** `/deleteMovie/:id`
  - Allows users to delete a movie by id from the database.

  **Get Movie Endpoint:** `/getMovie/:id`
  - Fetches and displays movie by id from the database.

## Error Handling
- Handles server errors (status 500) and page not found errors (status 404).

## Dependencies
- Express
- Cors
- Axios
- Dotenv
- Body-parser
- PostgreSQL

## API Key
- Make sure to set up your API key in a `.env` file and name the variable `API_KEY`.

## Feedback
- If you have any feedback or suggestions, please feel free to reach out to [Moayad Hamdan](https://github.com/Moayadhamdan).
