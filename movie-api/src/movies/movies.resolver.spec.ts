import { Test, TestingModule } from '@nestjs/testing';
import { MoviesResolver } from './movies.resolver';
import { MoviesService } from './movies.service';
import * as dotenv from 'dotenv';
dotenv.config();

describe('MoviesResolver', () => {
  let resolver: MoviesResolver;
  let service: MoviesService;

  const mockMovie = {
    id: '1',
    name: 'Test Movie',
    overview: 'This is a test movie',
    popularity: 10,
    voteAverage: 8.5,
    voteCount: 100,
    releaseDate: '2024-01-01',
    genres: [{ id: 1, name: 'Drama' }],
  };

  const mockMoviesService = {
    findById: jest.fn((id: string) => (id === '1' ? mockMovie : null)),
    findAll: jest.fn(() => [mockMovie]),
    save: jest.fn((movie) => movie),
    removeById: jest.fn((id: string) => {
        if (id === '1') {
          return { deletedCount: 1 }; // Geçerli bir film silindiğinde
        }
        return { deletedCount: 0 }; // Bulunamayan bir film için
      }),    
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesResolver,
        { provide: MoviesService, useValue: mockMoviesService },
      ],
    }).compile();

    resolver = module.get<MoviesResolver>(MoviesResolver);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findById', () => {
    it('should return a movie by ID', async () => {
      const result = await resolver.findById('1');
      expect(result).toEqual(mockMovie);
      expect(service.findById).toHaveBeenCalledWith('1');
    });

    it('should return null if movie is not found', async () => {
      const result = await resolver.findById('2');
      expect(result).toBeNull();
    });
  });

  describe('getAllMovies', () => {
    it('should return all movies', async () => {
      const result = await resolver.getAllMovies();
      expect(result).toEqual([mockMovie]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('createMovie', () => {
    it('should create and return a new movie', async () => {
      const result = await resolver.createMovie(mockMovie);
      expect(result).toEqual(mockMovie);
      expect(service.save).toHaveBeenCalledWith(mockMovie);
    });
  });

  describe('deleteMovie', () => {
    it('should delete a movie by ID and return true', async () => {
        const result = await resolver.deleteMovie('1');
        expect(result).toBe(true);
        expect(service.removeById).toHaveBeenCalledWith('1');
      });

    it('should return false if movie is not found', async () => {
        const result = await resolver.deleteMovie('2');
        expect(result).toBe(false);
        expect(service.removeById).toHaveBeenCalledWith('2');
      });
  });
});
