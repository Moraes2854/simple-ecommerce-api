import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { ProductCategoryService } from './product-category.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ ProductCategory ]) ],
  providers: [ ProductCategoryService ],
  exports: [ ProductCategoryService ]
})
export class ProductCategoryModule {}
