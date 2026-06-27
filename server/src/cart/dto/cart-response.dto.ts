import { Expose } from 'class-transformer';
import { Steps } from 'src/common/utils/enum';

export class CartProductItemDto {
  @Expose()
  id: number;

  @Expose()
  productId: number;

  @Expose()
  title: string;

  @Expose()
  type: Steps;

  @Expose()
  thumbnail: string | null;

  @Expose()
  price: number;

  @Expose()
  priceBeforeDiscount: number | null;

  @Expose()
  quantity: number;

  @Expose()
  variantId: number | null;

  @Expose()
  variantLabel: string | null;
}

export class CartPlanItemDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  packageId: number;

  @Expose()
  quantity: number;

  @Expose()
  type: Steps;

  @Expose()
  icon: string | null;

  @Expose()
  price: number;

  @Expose()
  priceBeforeDiscount: number | null;
}

export type CartItemDto = CartProductItemDto | CartPlanItemDto;
