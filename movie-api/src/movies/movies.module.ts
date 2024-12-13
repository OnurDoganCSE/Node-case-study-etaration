import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { MoviesController } from './movies.controller';
import { MoviesResolver } from './movies.resolver';
import { MoviesService } from './movies.service';
import { TmdbService } from '../services/tmdb.service';
import { MovieSchema } from '../schemas/movie.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema, collection: 'netflix.movies' }]),
  ],
  controllers: [MoviesController],
  providers: [MoviesService, TmdbService, MoviesResolver],
})
export class MoviesModule {}
