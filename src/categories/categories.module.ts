import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity';
import { AuthModule } from '../auth/auth.module';
import { ProductCategoryModule } from '../product-category/product-category.module';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [ 
    TypeOrmModule.forFeature([ Category ]),
    ProductCategoryModule,
    AuthModule,
  ],
})
export class CategoriesModule {}
