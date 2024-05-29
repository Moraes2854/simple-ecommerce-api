import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseBoolPipe, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, FindProductDto, UpdateProductDto } from './dto';
import { PaginationDto } from '../common/dto';
import { Auth } from '../auth/decorators';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth('admin')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(
    @Query() findProductDto: FindProductDto,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.productsService.findAll( findProductDto, paginationDto );
  }

  @Get('/byCategoryId/:categoryId')
  findAllByCategoryId(
    @Param('categoryId') categoryId: string,
    // @Query('isAvailable', ParseBoolPipe) isAvailable: boolean,
  ) {
    return this.productsService.findAllOrderedAlphabeticallyByCategory( categoryId, undefined );
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query() findProductDto: FindProductDto
  ) {
    return this.productsService.findOne( id, findProductDto );
  }

  @Get('/byName/:name')
  findByName(
    @Param('name') name: string,
    @Query() findProductDto: FindProductDto
  ) {
    return this.productsService.findByName( name, findProductDto );
  }

  @Put(':id')
  @Auth('admin')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Auth('admin')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

}
