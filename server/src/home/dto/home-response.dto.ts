import { Expose, Transform, Type } from 'class-transformer';
import { Steps } from 'src/common/utils/enum';
import { PackageResponseDto } from 'src/package/dto/package-response.dto';
import {
  ProductResponseDto,
  ProductVariantResponseDto,
} from 'src/products/dto/product-response.dto';

export class HomeStepResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  subTitle: string;

  @Expose()
  @Transform(({ obj }) => obj?.order)
  step: number;

  @Expose()
  icon?: string;

  @Expose()
  type: string;

  @Expose()
  @Transform(({ obj }) => {
    if (obj?.type === Steps.PRODUCT) {
      return obj?.products;
    } else {
      return obj?.packages;
    }
  })
  data: ProductVariantResponseDto[] | PackageResponseDto[];
}
