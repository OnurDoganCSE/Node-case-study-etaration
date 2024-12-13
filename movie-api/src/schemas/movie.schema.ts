import { Schema, Document } from 'mongoose';
import { ObjectType, Field, Float, Int } from '@nestjs/graphql';

// Mongoose Schema
export const MovieSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    overview: { type: String },
    popularity: { type: Number },
    voteAverage: { type: Number },
    voteCount: { type: Number },
    releaseDate: { type: String },
    genres: [
      {
        id: { type: Number },
        name: { type: String },
      },
    ],
  },
  { collection: 'netflix.movies' } 
);


@ObjectType()
export class Genre {
  @Field(() => Int) 
  id: number;

  @Field() 
  name: string;
}

@ObjectType()
export class Movie extends Document {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  overview: string;

  @Field(() => Float, { nullable: true })
  popularity: number;

  @Field(() => Float, { nullable: true })
  voteAverage: number;

  @Field(() => Int, { nullable: true })
  voteCount: number;

  @Field({ nullable: true })
  releaseDate: string;

  @Field(() => [Genre], { nullable: true })
  genres: Genre[];
}
