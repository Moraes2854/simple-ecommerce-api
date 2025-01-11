import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FindProductDto } from 'src/products/dto';
import { PaginationDto } from 'src/common/dto';
import { ProductsService } from '../products/products.service';
import { CategoriesService } from '../categories/categories.service';


@Controller('home')
export class HomeController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
  ) {}

    @Get('/products')
    async findAll(
      @Query() findProductDto: FindProductDto,
      @Query() paginationDto: PaginationDto,
    ) {
      const categories = await this.categoriesService.findAll( { }, { } );
      const categoriesIds = categories.filter( category => category.name.toLowerCase() === 'celulares' || category.name.toLowerCase() === 'consolas').map( category => category.id );
      return this.productsService.findAll( { ...findProductDto, categoriesIds }, paginationDto );
    }

}
