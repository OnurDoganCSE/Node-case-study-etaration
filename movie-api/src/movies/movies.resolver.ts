import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { Movie } from '../schemas/movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';


@Resolver(() => Movie) 
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Query(() => Movie, { name: 'findById' }) 
  async findById(@Args('id', { type: () => String }) id: string): Promise<Movie> {
    return this.moviesService.findById(id); 
  }
  @Query(() => [Movie], { name: 'getAllMovies' }) 
  async getAllMovies(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }
    // Yeni bir film oluştur
  @Mutation(() => Movie, { name: 'createMovie' })
  async createMovie(@Args('input') input: CreateMovieDto): Promise<Movie> {
    return this.moviesService.save(input);
  }
        // Bir filmi sil
   @Mutation(() => Boolean, { name: 'deleteMovie' })
    async deleteMovie(@Args('id', { type: () => String }) id: string): Promise<boolean> {
    const result = await this.moviesService.removeById(id);
    return result.deletedCount > 0;
    }
}
