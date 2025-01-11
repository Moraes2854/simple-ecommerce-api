import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { ProductsModule } from '../products/products.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  controllers: [HomeController],
  providers: [HomeService],
  imports: [ProductsModule, CategoriesModule]
})
export class HomeModule {}
