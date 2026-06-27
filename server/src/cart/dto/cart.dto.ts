import { Expose, Type } from 'class-transformer';
import { CartCategoryDto } from './cart-category.dto';

export class CartDto {
  @Expose()
  @Type(() => CartCategoryDto)
  categories: CartCategoryDto[];
}
