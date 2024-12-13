import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from '../schemas/movie.schema';
import { TmdbService } from '../services/tmdb.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel('Movie') private readonly movieModel: Model<Movie>,
    private readonly tmdbService: TmdbService,
  ) {}

  async save(movie: any) {
    try {
      const newMovie = new this.movieModel(movie);
      return await newMovie.save();
    } catch (err) {
      console.error('Failed to save movie:', err.message);
      throw err;
    }
  }

  async findById(id: string) {
    const movie = await this.movieModel.findOne({ id }).exec();
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  async findAll() {
    return this.movieModel.find().exec();
  }

  async removeById(id: string) {
    const result = await this.movieModel.deleteOne({ id }).exec();
    if (result.deletedCount === 0) {
        throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return result;
}

  async fetchAndPersistMovies() {
    try {
      console.log('Fetching movies from TMDB...');
      const movies = await this.tmdbService.discoverMovies();
  
      if (!movies || movies.length === 0) {
        console.error('No movies found in TMDB response');
        return;
      }
  
      for (const movie of movies) {
        try {
          console.log(`Fetching details for movie ID: ${movie.id}`);
          const details = await this.tmdbService.getMovieDetails(movie.id);
  
          if (!details.id || !details.title) {
            console.warn(`Skipping movie with invalid details. Movie ID: ${movie.id}`);
            console.error(`Invalid movie details for movie ID: ${movie.id}`);
            continue;
          }
  
          const movieData = {
            id: details.id.toString(),
            name: details.title,
            overview: details.overview || '',
            popularity: details.popularity || 0,
            voteAverage: details.vote_average || 0,
            voteCount: details.vote_count || 0,
            releaseDate: details.release_date || '',
            genres: details.genres.map((genre) => ({ id: genre.id, name: genre.name })),
          };
  
          console.log('Saving movie to database:', movieData);
          await this.save(movieData);
        } catch (err) {
          console.error(`Failed to fetch details for movie ID: ${movie.id}`, err.message);
        }
      }
    } catch (err) {
      console.error('Error fetching movies from TMDB:', err.message);
      throw new Error('Failed to fetch and persist movies.');
    }
  }
  
}
