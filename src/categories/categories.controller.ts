import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto, FindCategoryDto } from './dto';
import { PaginationDto } from '../common/dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(
    @Query() findCategoryDto: FindCategoryDto,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.categoriesService.findAll(findCategoryDto, paginationDto);
  }

  @Get('/alphabetically')
  findOrderedAlphabetically(
    @Query() findCategoryDto: FindCategoryDto,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.categoriesService.findOrderedAlphabetically( findCategoryDto, paginationDto )
  }

  @Get('/main')
  findMain(
    @Query() findCategoryDto: FindCategoryDto,
  ) {
    return this.categoriesService.findAllMain( findCategoryDto );
  }

  @Get('/tree')
  findTree(
    @Query() findCategoryDto: FindCategoryDto,
  ) {
    return this.categoriesService.findTree( findCategoryDto );
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query() findCategoryDto: FindCategoryDto,
  ) {
    return this.categoriesService.findOne(id, findCategoryDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
