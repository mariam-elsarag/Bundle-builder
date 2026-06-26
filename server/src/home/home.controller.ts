import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('api/v1/home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('steps')
  findSteps() {
    return this.homeService.getProductsByCategories();
  }
}
