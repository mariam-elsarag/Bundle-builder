import { Expose } from 'class-transformer';

export class FeatureResponseDto {
  @Expose()
  text: string;

  @Expose()
  order: number;
}
