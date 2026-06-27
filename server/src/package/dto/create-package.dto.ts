import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateFeatuerDto } from './create-feature.dto';

export class CreatePackageDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  title: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  subTitle: string;

  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'price must be a valid decimal with up to 2 digits after the point',
    },
  )
  @Min(0, { message: 'price cannot be negative' })
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false })
  @Min(0)
  @Max(100)
  discountRate?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFeatuerDto)
  features: CreateFeatuerDto[];
}
