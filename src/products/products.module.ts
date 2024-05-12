import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { ProductCategoryModule } from 'src/product-category/product-category.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [ TypeOrmModule.forFeature([ Product ]), ProductCategoryModule ],
})
export class ProductsModule {}
