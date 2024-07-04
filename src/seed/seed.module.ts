import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from '../auth/auth.module';
import { CategoriesModule } from '../categories/categories.module';
import { ProductCategoryModule } from '../product-category/product-category.module';
import { ProductsModule } from '../products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { User } from '../auth/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { ProductCategory } from '../product-category/entities/product-category.entity';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    TypeOrmModule.forFeature([ User, Category, Product, ProductCategory ]),
    // AuthModule,
    // CategoriesModule,
    // ProductCategoryModule,
    // ProductsModule
  ]
})
export class SeedModule {}
