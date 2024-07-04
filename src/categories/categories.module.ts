import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity';
import { AuthModule } from '../auth/auth.module';
import { ProductCategoryModule } from '../product-category/product-category.module';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([ Category ]),
    ProductCategoryModule,
    AuthModule,
  ],
  controllers: [CategoriesController],
  providers: [ CategoriesService ],
  exports: [ CategoriesService ],
})
export class CategoriesModule {}
