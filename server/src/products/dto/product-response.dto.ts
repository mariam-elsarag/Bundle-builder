import { Expose, Transform, Type } from 'class-transformer';

export class ProductVariantResponseDto {
  @Expose()
  id: number;

  @Expose()
  label: string;

  @Expose()
  thumbnail: string | null;

  @Expose()
  quantity: number;
}
export class ProductResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  image: string | null;

  @Expose()
  quantity: number | null;

  @Expose()
  @Transform(({ obj }) => {
    if (!obj.discountRate || Number(obj.discountRate) <= 0) {
      return null;
    }

    return `Save ${Number(obj.discountRate)}%`;
  })
  badge: string | null;

  @Expose()
  @Transform(({ obj }) => {
    const price = Number(obj.price);
    const discountRate = Number(obj.discountRate || 0);

    if (discountRate <= 0) {
      return price;
    }

    return Number((price - (price * discountRate) / 100).toFixed(2));
  })
  price: number;

  @Expose()
  @Transform(({ obj }) => {
    const price = Number(obj.price);
    const discountRate = Number(obj.discountRate || 0);

    return discountRate > 0 ? price : null;
  })
  priceBeforeDiscount: number | null;

  @Expose()
  @Type(() => ProductVariantResponseDto)
  variants: ProductVariantResponseDto[];
}
