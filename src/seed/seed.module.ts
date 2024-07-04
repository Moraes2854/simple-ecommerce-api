import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from '../auth/auth.module';
import { CategoriesModule } from '../categories/categories.module';
import { ProductCategoryModule } from '../product-category/product-category.module';
import { ProductsModule } from '../products/products.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    AuthModule,
    CategoriesModule,
    ProductCategoryModule,
    ProductsModule
  ]
})
export class SeedModule {}
