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
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AcceptFormData } from 'src/common/decorators/accept-form-data.decorator';

@Controller('api/v1/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.getCartByVisitorId(id);
  }
  @Put(':visitorId/:id')
  @AcceptFormData()
  updateCart(
    @Param('visitorId') visitorId: string,
    @Param('id') id: number,
    @Body() body: UpdateCartDto,
  ) {
    return this.cartService.updateCart(visitorId, +id, body);
  }
}
