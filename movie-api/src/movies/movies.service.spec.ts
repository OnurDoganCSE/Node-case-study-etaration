import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { getModelToken } from '@nestjs/mongoose';
import { TmdbService } from '../services/tmdb.service';
import { Model } from 'mongoose';
import { Movie } from '../schemas/movie.schema';
import * as dotenv from 'dotenv';
dotenv.config();
const mockMovieModel = {
  find: jest.fn(),
  findOne: jest.fn(),
  deleteOne: jest.fn(),
  save: jest.fn(),
};

const mockTmdbService = {
  discoverMovies: jest.fn(),
  getMovieDetails: jest.fn(),
};

describe('MoviesService', () => {
  let service: MoviesService;
  let movieModel: Model<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getModelToken('Movie'),
          useValue: mockMovieModel,
        },
        {
          provide: TmdbService,
          useValue: mockTmdbService,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    movieModel = module.get<Model<Movie>>(getModelToken('Movie'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all movies', async () => {
      const mockMovies = [{ id: '1', name: 'Movie 1' }, { id: '2', name: 'Movie 2' }];
      mockMovieModel.find.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockMovies),
      });

      const result = await service.findAll();
      expect(result).toEqual(mockMovies);
      expect(mockMovieModel.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should return a movie by ID', async () => {
      const mockMovie = { id: '1', name: 'Movie 1' };
      mockMovieModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockMovie),
      });

      const result = await service.findById('1');
      expect(result).toEqual(mockMovie);
      expect(mockMovieModel.findOne).toHaveBeenCalledWith({ id: '1' });
    });

    it('should throw an exception if movie is not found', async () => {
      mockMovieModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      });

      await expect(service.findById('invalid-id')).rejects.toThrow('Movie with ID invalid-id not found');
    });
  });

  describe('removeById', () => {
    it('should remove a movie by ID', async () => {
      mockMovieModel.deleteOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce({ deletedCount: 1 }),
      });

      const result = await service.removeById('1');
      expect(result).toEqual({ deletedCount: 1 });
      expect(mockMovieModel.deleteOne).toHaveBeenCalledWith({ id: '1' });
    });
  });
});
