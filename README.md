# Movies Library App - v1.0.0

**Author Name**: [Moayad Hamdan]

## WRRC
LAB11:

![WRRC(LAB11) Image](WRRC(lab11).png)
LAB12:

![WRRC(LAB11) Image](WRRC(lab12).png)


## Overview
This project is a movie library app that allows users to browse the latest movies based on categories.

## Getting Started
To build and run this app on your own machine, follow these steps:

1. Clone this repository to your local machine:

    git clone https://github.com/your-username/Movies-Library.git

2. Navigate to the project directory:

    cd Movies-Library

3. Install the required dependencies:

    npm install

4. Start the server:

    npm start

5. Open your web browser and go to the following address:

    http://localhost:3000/
    
6. You should now see the home page of the Movies Library app.

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

## Error Handling
- Handles server errors (status 500) and page not found errors (status 404).

## Dependencies
- Express
- Cors
- Axios
- Dotenv

## API Key
- Make sure to set up your API key in a `.env` file and name the variable `API_KEY`.

## Feedback
- If you have any feedback or suggestions, please feel free to reach out to [Moayad Hamdan](https://github.com/Moayadhamdan).

