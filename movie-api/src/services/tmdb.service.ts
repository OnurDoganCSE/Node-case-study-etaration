import { Injectable,HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { TMDB_API_BASE_URL, TMDB_API_KEY } from '../config/tmdb.config';


@Injectable()
export class TmdbService {
  constructor(private readonly httpService: HttpService) {}

  async discoverMovies() {
    try {
      const params = {
        api_key: TMDB_API_KEY, // Burada API anahtarını kullanıyoruz
        sort_by: 'release_date.asc',
        vote_count_gte: 1500,
        vote_average_gte: 8.4,
        with_watch_providers: '8', // Netflix
        watch_region: 'TR',
      };

      const response = this.httpService.get(`${TMDB_API_BASE_URL}/discover/movie`, { params });
      const { data } = await lastValueFrom(response);
  
      if (!data.results || data.results.length === 0) {
        throw new HttpException('No movies found in TMDB response', HttpStatus.NOT_FOUND);
      }
  
      return data.results;
    } catch (err) {
      console.error('Error fetching movies from TMDB API:', err.response?.data || err.message);
      throw new HttpException(
        `Failed to fetch movies: ${err.response?.data?.status_message || err.message}`,
        err.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  async getMovieDetails(movieId: number) {
    const response = this.httpService.get(`${TMDB_API_BASE_URL}/movie/${movieId}`, {
      params: { api_key: TMDB_API_KEY },
    });
    const { data } = await lastValueFrom(response);
    return data;
  }
}
