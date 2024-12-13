import { IsString, IsOptional, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType() 
class GenreDto {
  @Field(() => Int) 
  @IsNumber()
  id: number;

  @Field() 
  @IsString()
  name: string;
}

@InputType() 
export class CreateMovieDto {
  @Field() 
  @IsString()
  id: string;

  @Field() 
  @IsString()
  name: string;

  @Field({ nullable: true }) 
  @IsOptional()
  @IsString()
  overview: string;

  @Field(() => Float, { nullable: true }) 
  @IsOptional()
  @IsNumber()
  popularity: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  voteAverage: number;

  @Field(() => Int, { nullable: true }) 
  @IsOptional()
  @IsNumber()
  voteCount: number;

  @Field({ nullable: true }) 
  @IsOptional()
  @IsString()
  releaseDate: string;

  @Field(() => [GenreDto], { nullable: true }) 
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GenreDto)
  genres: GenreDto[];
}
