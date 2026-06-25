import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AcceptFormData } from 'src/common/decorators/accept-form-data.decorator';

@Controller('api/v1/category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Put()
  @AcceptFormData()
  createOrUpdate(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createOrUpdate(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
