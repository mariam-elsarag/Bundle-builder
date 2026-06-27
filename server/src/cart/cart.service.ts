import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';
import { Category } from 'src/categories/entities/category.entity';
import { INITIAL_CART, INITIAL_CART_PACKAGE } from 'src/common/utils/const';
import { CartDto } from './dto/cart.dto';
import { CartCategoryDto } from './dto/cart-category.dto';
import { Package } from 'src/package/entities/package.entity';
import { Steps } from 'src/common/utils/enum';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,

    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCartByVisitorId(visitorId: string) {
    let cart = await this.cartRepository.findOne({
      where: { visitorId },
      relations: {
        items: {
          product: { category: true },
          variant: true,
          package: true,
        },
      },
    });

    if (!cart) {
      cart = await this.createInitialCart(visitorId);
    }

    return this.toCartDto(cart);
  }

  private async createInitialCart(visitorId: string): Promise<Cart> {
    const categories = await this.categoryRepository.find({
      order: { order: 'ASC' },
      relations: { products: { variants: true } },
    });

    const [defaultPackage] = await this.packageRepository.find({
      where: { id: INITIAL_CART_PACKAGE.packageId },
    });

    const cart = await this.cartRepository.save({ visitorId });

    const cartItems: CartItem[] = [];

    // =========================
    // PRODUCTS
    // =========================
    for (const config of INITIAL_CART) {
      const category = categories.find((c) => c.order === config.categoryOrder);

      if (!category) continue;

      for (const productConfig of config.products) {
        const product = category.products?.[productConfig.productIndex];

        if (!product) continue;

        const item = new CartItem();
        item.cart = cart;
        item.product = product;
        item.quantity = productConfig.quantity ?? 1;
        item.type = Steps.PRODUCT;

        if (product.variants?.length) {
          const variant = product.variants[productConfig.variantIndex];
          if (variant) item.variant = variant;
        }

        cartItems.push(item);
      }
    }

    // =========================
    // PLAN
    // =========================
    if (defaultPackage) {
      const packageItem = new CartItem();

      packageItem.cart = cart;
      packageItem.package = defaultPackage;
      packageItem.type = Steps.PLAN;
      packageItem.quantity = 1;

      cartItems.push(packageItem);
    }

    await this.cartItemRepository.save(cartItems);

    const createdCart = await this.cartRepository.findOne({
      where: { id: cart.id },
      relations: {
        items: {
          product: { category: true },
          variant: true,
          package: true,
        },
      },
    });

    if (!createdCart) {
      throw new Error('Failed to load created cart.');
    }

    return createdCart;
  }

  private toCartDto(cart: Cart): CartDto {
    const map = new Map<number, CartCategoryDto>();

    for (const item of cart.items) {
      // product
      if (item.type === Steps.PRODUCT && item.product) {
        const category = item.product.category;

        if (!map.has(category.id)) {
          map.set(category.id, {
            id: category.id,
            name: category.name,
            order: category.order,
            items: [],
          });
        }

        map.get(category.id)!.items.push({
          id: item.id,
          title: item.product.name,
          productId: item.product.id,
          thumbnail: item.variant?.thumbnail ?? item.product.image,
          price: Number(item.product.price),
          priceBeforeDiscount:
            Number(item.product.discountRate) > 0
              ? Number(item.product.price)
              : null,
          variantId: item.variant?.id ?? null,
          variantLabel: item.variant?.label ?? null,
          quantity: item.quantity ?? 1,
          type: Steps.PRODUCT,
        });
      }

      //  package
      if (item.type === Steps.PLAN && item.package) {
        if (!map.has(-1)) {
          map.set(-1, {
            id: -1,
            name: 'Plan',
            order: 0,
            items: [],
          });
        }

        map.get(-1)!.items.push({
          id: item.id,
          title: item.package.title,
          packageId: item.package.id,
          quantity: item.quantity ?? 1,
          price: Number(item.package.price),
          priceBeforeDiscount:
            Number(item.package.discountRate) > 0
              ? Number(item.package.price)
              : null,
          icon: item?.package?.icon,
          type: Steps.PLAN,
        });
      }
    }

    const categories = [...map.values()].sort((a, b) => {
      if (a.id === -1) return 1;
      if (b.id === -1) return -1;

      return a.order - b.order;
    });

    return { categories };
  }
}
