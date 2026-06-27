import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateFeatuerDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  text: string;
}
