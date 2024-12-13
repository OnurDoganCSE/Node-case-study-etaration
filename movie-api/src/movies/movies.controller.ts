import { Controller, Get, Post, Delete, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from '../schemas/movie.schema';
import { ApiParam , ApiResponse } from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiBody({
    description: 'Create a new movie',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '12345' },
        name: { type: 'string', example: 'Custom Movie' },
        overview: { type: 'string', example: 'A custom movie for testing purposes.' },
        popularity: { type: 'number', example: 10 },
        voteAverage: { type: 'number', example: 8.5 },
        voteCount: { type: 'number', example: 200 },
        releaseDate: { type: 'string', example: '2024-01-01' },
        genres: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              name: { type: 'string', example: 'Drama' },
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Movie created successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
    content: {
      'application/json': {
        example: {
          statusCode: 400,
          message: ['name must be a string', 'voteAverage must be a number'],
          error: 'Bad Request',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Movie not found.',
    content: {
      'application/json': {
        example: {
          statusCode: 404,
          message: 'Movie with ID 12345 not found',
          error: 'Not Found',
        },
      },
    },
  })
  async save(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) createMovieDto: CreateMovieDto) {
    return this.moviesService.save(createMovieDto);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, description: 'Movie ID' })
  @ApiResponse({ status: 200, description: 'Movie retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  async findById(@Param('id') id: string) {
    return this.moviesService.findById(id);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of all movies.' })
  async findAll() {
    return this.moviesService.findAll();
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String, description: 'Movie ID' })
  @ApiResponse({ status: 200, description: 'Movie deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  async deleteById(@Param('id') id: string) {
    return this.moviesService.removeById(id);
  }

  @Post('fetch')
  fetchAndPersistMovies() {
    return this.moviesService.fetchAndPersistMovies();
  }
}
