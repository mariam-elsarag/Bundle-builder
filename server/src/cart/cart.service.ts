import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { INITIAL_CART, INITIAL_CART_PACKAGE } from 'src/common/utils/const';
import { Steps } from 'src/common/utils/enum';
import { HomeStep } from 'src/home/entities/step.entities';
import { Package } from 'src/package/entities/package.entity';
import { Product } from 'src/products/entities/product.entity';
import { Variant } from 'src/products/entities/variant.entity';
import { Repository } from 'typeorm';
import { CartCategoryDto } from './dto/cart-category.dto';
import { CartDto } from './dto/cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartItem } from './entities/cart-item.entity';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,

    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,

    @InjectRepository(HomeStep)
    private readonly stepRepository: Repository<HomeStep>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Variant)
    private readonly variantRepository: Repository<Variant>,
  ) {}

  async getCartByVisitorId(visitorId: string) {
    let cart = await this.cartRepository.findOne({
      where: { visitorId },
      relations: {
        items: {
          product: { step: true },
          variant: true,
          package: true,
        },
      },
    });

    if (!cart) {
      cart = await this.createInitialCart(visitorId);
    }
    // return cart;
    const cartData = this.toCartDto(cart);
    return plainToInstance(CartDto, cartData, {
      excludeExtraneousValues: true,
    });
  }

  async updateCart(visitorId: string, id: number, body: UpdateCartDto) {
    const cart = await this.cartRepository.findOne({
      where: { visitorId, id },
      relations: {
        items: {
          product: true,
          variant: true,
          package: true,
        },
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const incomingKeys = new Set<string>();

    for (const dto of body.items) {
      const key = dto.packageId
        ? `package-${dto.packageId}`
        : `product-${dto.productId}-${dto.variantId ?? 0}`;

      incomingKeys.add(key);

      const cartItem = cart.items.find((item) => {
        if (dto.packageId) {
          return item.package?.id === dto.packageId;
        }

        return (
          item.product?.id === dto.productId &&
          (item.variant?.id ?? null) === (dto.variantId ?? null)
        );
      });

      if (cartItem) {
        if (dto.quantity <= 0) {
          await this.cartItemRepository.remove(cartItem);
        } else {
          cartItem.quantity = dto.quantity;
          await this.cartItemRepository.save(cartItem);
        }
        continue;
      }

      if (dto.quantity <= 0) continue;

      const newItem = this.cartItemRepository.create({
        cart,
        quantity: dto.quantity,
      });

      if (dto.packageId) {
        const pkg = await this.packageRepository.findOneBy({
          id: dto.packageId,
        });

        if (!pkg) {
          throw new NotFoundException(`Package ${dto.packageId} not found`);
        }

        newItem.package = pkg;
        newItem.type = Steps.PLAN;
      } else {
        const product = await this.productRepository.findOne({
          where: { id: dto.productId },
        });

        if (!product) {
          throw new NotFoundException(`Product ${dto.productId} not found`);
        }

        newItem.product = product;
        newItem.type = Steps.PRODUCT;

        if (dto.variantId) {
          const variant = await this.variantRepository.findOne({
            where: {
              id: dto.variantId,
              product: { id: dto.productId },
            },
            relations: { product: true },
          });

          if (!variant) {
            throw new NotFoundException(`Variant ${dto.variantId} not found`);
          }

          newItem.variant = variant;
        }
      }

      await this.cartItemRepository.save(newItem);
    }

    // remove items not sent
    for (const item of cart.items) {
      const key = item.package
        ? `package-${item.package.id}`
        : `product-${item.product?.id}-${item.variant?.id ?? 0}`;

      if (!incomingKeys.has(key)) {
        await this.cartItemRepository.remove(item);
      }
    }

    return this.getCartByVisitorId(visitorId);
  }

  private async createInitialCart(visitorId: string): Promise<Cart> {
    const steps = await this.stepRepository.find({
      order: { order: 'ASC' },
      relations: { products: { variants: true } },
    });

    const [defaultPackage] = await this.packageRepository.find({
      where: { id: INITIAL_CART_PACKAGE.packageId },
    });

    const cart = await this.cartRepository.save({ visitorId });

    const cartItems: CartItem[] = [];

    // products
    for (const config of INITIAL_CART) {
      const step = steps.find((c) => c.order === config.stepOrder);

      if (!step) continue;

      for (const productConfig of config.products) {
        const product = step.products?.[productConfig.productIndex];

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

    // package
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
          product: { step: true },
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

  private toCartDto(cart: Cart) {
    const map = new Map<number, CartCategoryDto>();
    let plan: CartCategoryDto | null = null;

    for (const item of cart.items) {
      if (item.type === Steps.PRODUCT && item.product) {
        const step = item.product.step;

        if (!map.has(step.id)) {
          map.set(step.id, {
            id: step.id,
            name: step.subTitle,
            order: step.order,
            items: [],
          });
        }

        const price = Number(item.product.price || 0);
        const discountRate = Number(item.product.discountRate || 0);
        const hasDiscount = discountRate > 0;

        map.get(step.id)!.items.push({
          id: item.id,
          title: item.product.name,
          productId: item.product.id,
          thumbnail: item.variant?.thumbnail ?? item.product.image,
          price: hasDiscount
            ? Number((price - (price * discountRate) / 100).toFixed(2))
            : price,
          priceBeforeDiscount: hasDiscount ? price : null,
          variantId: item.variant?.id ?? null,
          variantLabel: item.variant?.label ?? null,
          quantity: item.quantity ?? 1,
          type: Steps.PRODUCT,
        });
      }

      if (item.type === Steps.PLAN && item.package) {
        const price = Number(item.package.price || 0);
        const discountRate = Number(item.package.discountRate || 0);
        const hasDiscount = discountRate > 0;

        plan = {
          id: item.package.id,
          name: 'Plan',
          order: Number.MAX_SAFE_INTEGER,
          items: [
            {
              id: item.id,
              title: item.package.title,
              packageId: item.package.id,
              quantity: item.quantity ?? 1,
              price: hasDiscount
                ? Number((price - (price * discountRate) / 100).toFixed(2))
                : price,
              priceBeforeDiscount: hasDiscount ? price : null,
              icon: item.package.icon,
              billingCycle: item.package.billingCycle,
              type: Steps.PLAN,
            },
          ],
        };
      }
    }

    const data = [...map.values()].sort((a, b) => a.order - b.order);

    if (plan) {
      data.push(plan);
    }

    return {
      id: cart.id,
      data,
    };
  }
}
