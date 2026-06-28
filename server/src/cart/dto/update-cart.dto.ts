import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class UpdateCartItemDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ allowNaN: false })
  @IsInt()
  packageId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ allowNaN: false })
  productId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ allowNaN: false })
  variantId?: number;

  @Type(() => Number)
  @IsNumber({ allowNaN: false })
  quantity: number;
}

export class UpdateCartDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateCartItemDto)
  items: UpdateCartItemDto[];
}
