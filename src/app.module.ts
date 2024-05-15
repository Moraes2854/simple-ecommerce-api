import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { envs } from './config/envs';
import { HomeModule } from './home/home.module';
import { TrendsModule } from './trends/trends.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host: envs.dbHost,
      port: envs.dbPort,
      database: envs.dbName,
      username: envs.dbUsername,
      password: envs.dbPassword,
      autoLoadEntities: true,
      synchronize: true,
      ssl: true
    }),
    ProductsModule, 
    CategoriesModule,
    ProductCategoryModule,
    HomeModule,
    TrendsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
