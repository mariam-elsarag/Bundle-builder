import { Exclude, Expose, Type } from 'class-transformer';
import {
  CartItemDto,
  CartPlanItemDto,
  CartProductItemDto,
} from './cart-response.dto';

export class CartCategoryDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Exclude()
  order: number;

  @Expose()
  items: (CartProductItemDto | CartPlanItemDto)[];
}
