import { Expose, Transform, Type } from 'class-transformer';
import { FeatureResponseDto } from './feature-response.dto';

export class PackageResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  subtitle: string;

  @Expose()
  icon: string | null;

  @Expose()
  @Transform(({ obj }) => {
    const price = Number(obj.price);
    const discountRate = Number(obj.discountRate);

    if (!discountRate || discountRate <= 0) {
      return price;
    }

    return (price - (price * discountRate) / 100).toFixed(2);
  })
  price: number;

  @Expose()
  @Transform(({ obj }) => {
    const price = Number(obj.price);
    const discountRate = Number(obj.discountRate);

    if (!discountRate || discountRate <= 0) {
      return null;
    }

    return price;
  })
  priceBeforeDiscount: number;

  @Expose()
  billingCycle: string;

  @Expose()
  currency: string;

  @Expose()
  @Type(() => FeatureResponseDto)
  features: FeatureResponseDto[];
}
