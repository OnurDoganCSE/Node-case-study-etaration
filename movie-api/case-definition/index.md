# Backend Developer Case Study (Node.js)

## Introduction

Dear candidate,

Below are the assignments you need to complete in order to proceed along this case study.

- **Design and develop** an API that retrieves data from _The Movie Database_, [TMDB](https://www.themoviedb.org/). (_Details will be elaborated in **API** section_)
- **Persist** fetched data into MongoDB.
- **Provide** CRUD endpoints for your persisted resource(s) to be consumed by other parties.
- **Document** the API w.r.t OpenAPI Specification (formerly known as Swagger Specification).
- **Provide** tests for your source code. (See the test pyramide [here](https://martinfowler.com/articles/practical-test-pyramid.html#:~:text=you%20ask%20me.-,The%20Test%20Pyramid,-If%20you%20want)
  and implement it at your own discretion)

## About TMDB

- It is free.
- An [API Key](https://developers.themoviedb.org/3/getting-started/authentication) is required to interact with it.
- One could check the documentation [here](https://developers.themoviedb.org/3/getting-started/introduction).

## Requirements and Tips

> Technology wise the case should comply with the following requirements;

- Use `Node.js` within a proven open-source framework (preferably **NestJS**).
- Demonstrate your ability to work with **MongoDB**.
- Provide endpoints (REST and/or GQL) to interact with the persisted data.

> One must consider the following principles and conventions while finalizing the case study:

- Conclude this case study with a **running** project.
- Incorporate good programming principles (SOLID, OOP, DPs) when applicable.
- Provide a good documentation for another developer in a suitable format (`foo.md`).
- Incorporate validation and exception handling mechanisms.
- Containerization is not **a must** but it is **very nice to have**.

> The case study consists of two parts (**API** & **QUERIES**) make sure to showcase your best effort in all of them.

---

## API & DATA MODEL REQUIREMENTS

### Rest API Call

- The data you need to fetch from _TMDB_:

  - Using `/discover/movie-discover` endpoint of TMDB API:

    - Find 5 Movies with oldest release date (`sort_by: release_date.asc`)
    - with average vote count of `1500` (`vote_count_gte: 1500`)
    - with average vote of `8.4` (`vote_average_gte: 8.4`)
    - on Netflix platform (`watch_provider_id: 8`)
    - in Turkey (`watch_region: TR`),

  - A sample result obtained from discover, could look like as shown below:

```json
{
    "page": 1,
    "results": [
        {
            "adult": false,
            "backdrop_path": "/loRmRzQXZeqG78TqZuyvSlEQfZb.jpg",
            "genre_ids": [
                18,
                36,
                10752
            ],
            "id": 424,
            "original_language": "en",
            "original_title": "Schindler's List",
            "overview": "The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis while they worked as slaves in his factory during World War II.",
            "popularity": 53.209,
            "poster_path": "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
            "release_date": "1993-11-30",
            "title": "Schindler's List",
            "video": false,
            "vote_average": 8.6,
            "vote_count": 12612
        },
        {
            "adult": false,
            "backdrop_path": "/qdIMHd4sEfJSckfVJfKQvisL02a.jpg",
            "genre_ids": [
                35,
                18,
                10749
            ],
            "id": 13,
            "original_language": "en",
            "original_title": "Forrest Gump",
            "overview": "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.",
            "popularity": 73.369,
            "poster_path": "/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
            "release_date": "1994-07-06",
            "title": "Forrest Gump",
            "video": false,
            "vote_average": 8.5,
            "vote_count": 22491
        },
        .
        .
        .
}
```

### Persistence

- For movies complying with the criteria above:

  - Fetch and persist `Movie` related information using `/movies/get-movie-details` (endpoint requires a movie ID obtanined from previous step) with fields:

  - ID: A UUID string.
    - `id: string`
  - NAME: Name of the movie (string)
    - `name: string`
  - OVERVIEW: Overview of the movie (string)
    - `overview: string`
  - POPULARITY: Popularity value (number)
    - `popularity: number`
  - VOTE_AVERAGE: Averege vote value (number)
    - `voteAverage: number`
  - VOTE_COUNT: Vote count value (number)
    - `voteCount: number`
  - RELEASE_DATE: Date of release (string)
    - `releaseDate: string`
  - GENRES: Genre information (array of `Genre` objects)

    - `genre: {id: number, name:string}`

    </br>

- You should save to a collection with name `netflix.movies`.
- A sample result obtained from movie details, could look like as shown below:

```json
{
  "adult": false,
  "backdrop_path": "/loRmRzQXZeqG78TqZuyvSlEQfZb.jpg",
  "belongs_to_collection": null,
  "budget": 22000000,
  "genres": [
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 10752,
      "name": "War"
    }
  ],
  "homepage": "http://www.schindlerslist.com/",
  "id": 424,
  "imdb_id": "tt0108052",
  "original_language": "en",
  "original_title": "Schindler's List",
  "overview": "The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis while they worked as slaves in his factory during World War II.",
  "popularity": 53.209,
  "poster_path": "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
  "production_companies": [
    {
      "id": 33,
      "logo_path": "/8lvHyhjr8oUKOOy2dKXoALWKdp0.png",
      "name": "Universal Pictures",
      "origin_country": "US"
    },
    {
      "id": 56,
      "logo_path": "/cEaxANEisCqeEoRvODv2dO1I0iI.png",
      "name": "Amblin Entertainment",
      "origin_country": "US"
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": "US",
      "name": "United States of America"
    }
  ],
  "release_date": "1993-11-30",
  "revenue": 321365567,
  "runtime": 195,
  "spoken_languages": [
    {
      "english_name": "German",
      "iso_639_1": "de",
      "name": "Deutsch"
    },
    {
      "english_name": "Polish",
      "iso_639_1": "pl",
      "name": "Polski"
    },
    {
      "english_name": "Hebrew",
      "iso_639_1": "he",
      "name": "עִבְרִית"
    },
    {
      "english_name": "English",
      "iso_639_1": "en",
      "name": "English"
    }
  ],
  "status": "Released",
  "tagline": "Whoever saves one life, saves the world entire.",
  "title": "Schindler's List",
  "video": false,
  "vote_average": 8.6,
  "vote_count": 12612
}
```

- Provide following `REST` endpoints for your `Movie` entity:

```js

@Post()
save(movie: Movie) {}

@Get()
findById(id: string): Movie {}

@Get()
findAll(): Movie[] {}

@Delete()
removeById(id: string): Movie {}

```

## BONUS TASK

- Provide following GQL endpoint for your `Movie` entity (go with `schema first` approach)

```js
@Query('findById')
findById(@Args('id') id: string) : Movie {}
```
