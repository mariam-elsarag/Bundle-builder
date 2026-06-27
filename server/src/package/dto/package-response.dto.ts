import { Expose, Type } from 'class-transformer';
import { FeatureResponseDto } from './feature-response.dto';

export class PackageResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  subtitle: string;

  @Expose()
  price: number;

  @Expose()
  discountRate: number;

  @Expose()
  billingCycle: string;

  @Expose()
  currency: string;

  @Expose()
  @Type(() => FeatureResponseDto)
  features: FeatureResponseDto[];
}
