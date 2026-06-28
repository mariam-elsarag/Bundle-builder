import { Expose, Transform, Type } from 'class-transformer';
import { CartCategoryDto } from './cart-category.dto';

export class CartDto {
  @Expose()
  @Transform(({ obj }) => obj.id)
  cartId: number;

  @Expose()
  @Type(() => CartCategoryDto)
  data: CartCategoryDto[];
}
