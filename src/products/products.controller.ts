import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseBoolPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, FindProductDto, UpdateProductDto } from './dto';
import { PaginationDto } from '../common/dto';
import { Auth } from '../auth/decorators';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Auth()
  findAll(
    @Query() findProductDto: FindProductDto,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.productsService.findAll( findProductDto, paginationDto );
  }

  @Get('/byCategoryId/:categoryId')
  findAllByCategoryId(
    @Param('categoryId') categoryId: string,
    @Query('isAvailable', ParseBoolPipe) isAvailable: boolean,
  ) {
    return this.productsService.findAllOrderedAlphabeticallyByCategory( categoryId, isAvailable );
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query() findProductDto: FindProductDto
  ) {
    return this.productsService.findOne( id, findProductDto );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
