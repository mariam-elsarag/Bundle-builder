import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductVariantDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({ allowNaN: false })
  @IsInt()
  @Min(0)
  quantity: number;
}
