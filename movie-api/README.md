# Node Case Study

## [CASE DEFINITION](https://gitlab.eteration.com/academy/assignments/node-case-study/-/tree/master/case-definition)

## [CHECKLIST](https://gitlab.eteration.com/academy/assignments/node-case-study/-/tree/master/review-standards)


# Movie API

This is a RESTful API built with NestJS for fetching, persisting, and managing movie data from [The Movie Database (TMDB)](https://www.themoviedb.org/).

## Features
- Fetch movies from TMDB based on specific criteria.
- Persist movie data into MongoDB.
- Provide CRUD endpoints for managing movies.
- Fully documented using Swagger.
- Includes unit tests for services.

## Installation

Install dependencies:

npm install
Set up MongoDB:

Ensure MongoDB is running locally or provide a MongoDB URI.
The default URI is: mongodb://127.0.0.1:27017/etaration.
Configure TMDB API Key:

Add your TMDB API key in src/config/tmdb.config.ts:
typescript
export const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_API_KEY = 'your-tmdb-api-key';
Running the Application
Start the development server:

npm run start
Access the API documentation:

Navigate to http://localhost:3000/api to view the Swagger UI.


Endpoints
Movies
POST /movies: Create a new movie.
GET /movies: Retrieve all movies.
GET /movies/:id: Retrieve a movie by ID.
DELETE /movies/:id: Delete a movie by ID.


Testing
Run all tests:
npm test
Run tests for a specific file:
npm test movies.service.spec.ts


Bonus: GraphQL (if implemented)
Query:
graphql
query {
  findById(id: "1") {
    id
    name
    overview
    genres {
      id
      name
    }
  }
}

query {
  getAllMovies {
    id
    name
    releaseDate
  }
}
etc.



-----START---
 docker-compose up -d --build