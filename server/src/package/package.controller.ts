import { Body, Controller, Post } from '@nestjs/common';
import { AcceptFormData } from 'src/common/decorators/accept-form-data.decorator';
import { CreatePackageDto } from './dto/create-package.dto';
import { PackageService } from './package.service';

@Controller('api/v1/package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post()
  @AcceptFormData()
  create(@Body() createPackageDto: CreatePackageDto) {
    return this.packageService.create(createPackageDto);
  }
}
