import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';
import { Category } from 'src/categories/entities/category.entity';
import { INITIAL_CART } from 'src/common/utils/const';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  create(createCartDto: CreateCartDto) {
    return 'This action adds a new cart';
  }

  async getCartByVisitorId(visitorId: string) {
    let cart = await this.cartRepository.findOne({
      where: {
        visitorId,
      },
      relations: {
        items: {
          product: {
            category: true,
          },
          variant: true,
        },
      },
    });

    if (!cart) {
      cart = await this.createInitialCart(visitorId);
    }

    return cart;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  private async createInitialCart(visitorId: string): Promise<Cart> {
    const categories = await this.categoryRepository.find({
      order: {
        order: 'ASC',
      },
      relations: {
        products: {
          variants: true,
        },
      },
    });

    const cart = await this.cartRepository.save({
      visitorId,
    });

    const cartItems: CartItem[] = [];

    for (const config of INITIAL_CART) {
      const category = categories.find((c) => c.order === config.categoryOrder);

      if (!category) continue;

      for (const productConfig of config.products) {
        const product = category.products[productConfig.productIndex];

        if (!product) continue;

        const item = new CartItem();

        item.cart = cart;
        item.product = product;
        item.quantity = productConfig.quantity;

        // Product has variants
        if (product.variants?.length) {
          const variant = product.variants[productConfig.variantIndex];

          if (!variant) continue;

          item.variant = variant;
        }

        cartItems.push(item);
      }
    }

    await this.cartItemRepository.save(cartItems);

    const createdCart = await this.cartRepository.findOne({
      where: {
        id: cart.id,
      },
      relations: {
        items: {
          product: {
            category: true,
          },
          variant: true,
        },
      },
    });

    if (!createdCart) {
      throw new Error('Failed to load created cart.');
    }

    return createdCart;
  }
}
