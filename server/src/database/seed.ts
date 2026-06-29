import { DataSource } from 'typeorm';
import { HomeStep } from 'src/home/entities/step.entities';
import { Product } from 'src/products/entities/product.entity';
import { Variant } from 'src/products/entities/variant.entity';
import { Package } from 'src/package/entities/package.entity';
import { Feature } from 'src/package/entities/feature.entity';
import { BillingCycle, Currency, Steps } from '../common/utils/enum';

export const seedDatabase = async (dataSource: DataSource) => {
  const stepRepo = dataSource.getRepository(HomeStep);
  const productRepo = dataSource.getRepository(Product);
  const variantRepo = dataSource.getRepository(Variant);
  const packageRepo = dataSource.getRepository(Package);
  const featureRepo = dataSource.getRepository(Feature);

  // Prevent duplicate seeding
  const existingSteps = await stepRepo.count();
  if (existingSteps > 0) {
    console.log('🌱 Seed already exists, skipping...');
    return;
  }

  console.log('🌱 Starting database seed...');

  /**
   * 1️⃣ Create HomeStep
   */
  const steps = stepRepo.create([
    {
      title: 'cameras',
      subTitle: 'Choose your cameras',
      order: 1,
      type: Steps.PRODUCT,
      icon: 'https://res.cloudinary.com/dqcdxspmu/image/upload/v1782421453/livestream_r1dty4.svg',
    },
    {
      title: 'plan',
      subTitle: 'Choose your plan',
      order: 2,
      type: Steps.PLAN,
      icon: 'https://res.cloudinary.com/dqcdxspmu/image/upload/v1782421453/shield_d3s6kq.svg',
    },
    {
      title: 'sensors',
      subTitle: 'Choose your sensors',
      order: 3,
      type: Steps.PRODUCT,
      icon: 'https://res.cloudinary.com/dqcdxspmu/image/upload/v1782421453/sensor_f9gqey.svg',
    },
    {
      title: 'accessories',
      subTitle: 'Add extra protection',
      order: 4,
      type: Steps.PRODUCT,
      icon: 'https://res.cloudinary.com/dqcdxspmu/image/upload/v1782421453/protection_lesazj.svg',
    },
  ]);

  await stepRepo.save(steps);

  /**
   * 2️⃣ Create Product linked to Step
   */

  const product = productRepo.create([
    {
      name: 'Wyze Cam v4',
      description: 'The clearest Wyze Cam ever made.',
      image:
        'https://res.cloudinary.com/dqcdxspmu/image/upload/v1782411929/wyze_cam_v4_white_t9rlot.png',
      price: 35.98,
      discountRate: 22.0,
      quantity: null,
      step: steps[0],
    },
    {
      name: 'Wyze Cam Pan v3',
      description: '360° pan and 180° tilt security camera.',
      image:
        'https://res.cloudinary.com/dqcdxspmu/image/upload/v1782411928/wyz_cam_pan_v3_white_oqkij6.png',
      price: 39.89,
      discountRate: 12.0,
      step: steps[0],
    },
    {
      name: 'Wyze Cam Floodlight v2',
      description:
        '2K floodlight camera with a 160° wide-angle view for your garage.',
      image:
        'https://res.cloudinary.com/dqcdxspmu/image/upload/v1782411930/wyze_cam_floodlight_v2_white_xtzjrw.png',
      price: 89.98,
      discountRate: 22.0,
      step: steps[0],
    },
    {
      name: 'Wyze Duo Cam Doorbell',
      description: 'Two cameras. Two views. Double the porch protection',
      image:
        'https://res.cloudinary.com/dqcdxspmu/image/upload/v1782411928/wyz_duo_black_ccq4je.png',
      price: 69.98,
      discountRate: 0,
      quantity: 40,
      step: steps[0],
    },
    {
      name: 'Wyze Battery Cam Pro',
      description:
        'Protect anywhere. See everything in 2.5K HDR. No power outlet or electrician needed',
      image:
        'https://res.cloudinary.com/dqcdxspmu/image/upload/v1782411928/wyze_battery_cam_pro_white_q584sg.png',
      price: 89.98,
      discountRate: 0,
      step: steps[0],
    },
    {
      name: 'Wyze Sense Motion Sensor',
      description:
        'Detects motion. Requires Wyze Sense v2 or Wyze Home Monitoring.',
      image:
        'https://res.cloudinary.com/dqcdxspmu/image/upload/v1782582782/wyze-sense-motion-sensor-wyze-labs-inc-814192_hvk1mx.webp',
      price: 29.99,
      discountRate: 0,
      quantity: 40,
      step: steps[2],
    },
    {
      name: 'Wyze Sense Hub (Required)',
      description:
        'Detects motion. Requires Wyze Sense v2 or Wyze Home Monitoring.',
      image:
        'https://res.cloudinary.com/dqcdxspmu/image/upload/v1782582788/sense-hub-2_gbyo0s.webp',
      price: 29.92,
      discountRate: 100.0,
      quantity: 40,
      step: steps[2],
    },
    {
      name: 'Wyze MicroSD Card (256GB)',
      description:
        '256GB microSD card for reliable local video storage on Wyze cameras.',
      image:
        'https://res.cloudinary.com/dqcdxspmu/image/upload/v1782583018/256GBSDCardPOW_wmlf7b.webp',
      price: 20.98,
      discountRate: 0.0,
      quantity: 40,
      step: steps[3],
    },
  ]);

  await productRepo.save(product);

  /**
   * 3️⃣ Create Variants linked to Product
   */
  const variants = variantRepo.create([
    {
      label: 'White',
      thumbnail:
        'https://res.cloudinary.com/dqcdxspmu/image/upload/v1782411929/wyze_cam_v4_white_t9rlot.png',
      quantity: 20,
      product: product[0],
    },
    {
      label: 'Grey',
      thumbnail:
        'https://res.cloudinary.com/dqcdxspmu/image/upload/v1782411928/s_wyze_cam_v4_grey_tpioas.png',
      quantity: 20,
      product: product[0],
    },
    {
      label: 'Black',
      thumbnail:
        'https://res.cloudinary.com/dqcdxspmu/image/upload/v1782411928/s_wyze_cam_v4_black_ttt6ca.png',
      quantity: 20,
      product: product[0],
    },
    {
      label: 'White',
      thumbnail:
        'https://res.cloudinary.com/dqcdxspmu/image/upload/v1782411928/wyz_cam_pan_v3_white_oqkij6.png',
      quantity: 20,
      product: product[1],
    },
    {
      label: 'Black',
      thumbnail:
        'https://res.cloudinary.com/dqcdxspmu/image/upload/v1782411929/wyze_cam_pan_v3_black_fcxzst.png',
      quantity: 20,
      product: product[1],
    },
    {
      label: 'White',
      thumbnail:
        'https://res.cloudinary.com/dqcdxspmu/image/upload/v1782411930/wyze_cam_floodlight_v2_white_xtzjrw.png',
      quantity: 20,
      product: product[2],
    },
    {
      label: 'Black',
      thumbnail:
        'https://res.cloudinary.com/dqcdxspmu/image/upload/v1782411928/wyze_cam_floodlight_v2_black_i3ouoq.png',
      quantity: 20,
      product: product[2],
    },
    {
      label: 'White',
      thumbnail:
        'https://res.cloudinary.com/dqcdxspmu/image/upload/v1782411928/wyze_battery_cam_pro_white_q584sg.png',
      quantity: 20,
      product: product[4],
    },
    {
      label: 'Black',
      thumbnail:
        'https://res.cloudinary.com/dqcdxspmu/image/upload/v1782411928/wyze_battery_cam_pro_black_jklfm0.png',
      quantity: 20,
      product: product[4],
    },
  ]);
  await variantRepo.save(variants);
  /**
   * 4️⃣ Create Package linked to Step
   */
  const pkg = packageRepo.create({
    title: 'Cam Unlimited',
    subTitle: 'Covers all your cameras',
    price: 12.99,
    discountRate: 23.1,
    billingCycle: BillingCycle.MONTH,
    currency: Currency.USD,
    icon: 'https://res.cloudinary.com/dqcdxspmu/image/upload/v1782592267/Layer_1_wxehli.png',
    step: steps[1],
  });

  await packageRepo.save(pkg);

  /**
   * 5️⃣ Create feature linked to package
   */
  const features = featureRepo.create([
    {
      text: 'The brand-new multi-cam timeline for live view and events',
      order: 1,
      package: pkg,
    },
    {
      text: 'Smart Arm/Disarm modes',
      order: 2,
      package: pkg,
    },
  ]);
  await featureRepo.save(features);

  console.log('✅ Seed completed successfully!');
};
