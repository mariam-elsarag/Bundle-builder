import { Expose, Transform, Type } from 'class-transformer';
import { ProductResponseDto } from 'src/products/dto/product-response.dto';

export class HomeStepsResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  icon: string | null;

  @Expose()
  @Transform(({ obj }) => obj.order)
  step: number;

  @Expose()
  @Type(() => ProductResponseDto)
  products: ProductResponseDto[];
}
