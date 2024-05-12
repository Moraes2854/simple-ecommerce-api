import { Injectable, Logger, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, Like, IsNull, ILike } from 'typeorm';

import { CreateCategoryDto, UpdateCategoryDto, FindCategoryDto } from './dto';
import { Category } from './entities/category.entity';
import { PaginationDto } from '../common/dto';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger('CategoriesService');
    
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly dataSource: DataSource,

  ){}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      await this.validate( createCategoryDto );
      const category = this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.save( category );
      return category;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async findAll( filters: FindCategoryDto, paginationDto: PaginationDto ) {
    try {
      const { limit = 20, offset = 0 } = paginationDto;
      const categories = await this.categoryRepository.find({
        where: this.buildWhereByFilters( filters ),
        take: limit,
        skip: offset,
      });
      return categories;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async findOrderedAlphabetically( filters: FindCategoryDto, paginationDto: PaginationDto ){
    try {
      const { limit = 20, offset = 0 } = paginationDto;
      const categories = await this.categoryRepository.find({
        where: this.buildWhereByFilters( filters ),
        take: limit,
        skip: offset,
        order: {
          name: 'ASC',
        }
      });
      return categories;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async findAllMain( filters: FindCategoryDto, paginationDto: PaginationDto ){
    try {
      const { limit = 20, offset = 0 } = paginationDto;
      const categories = await this.categoryRepository.find({
        where: {
          ...this.buildWhereByFilters( filters ),
          parentId: IsNull()
        },
        take: limit,
        skip: offset,
        order: {
          name: 'ASC',
        }
      });
      return categories;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async findOne( id: string, filters: FindCategoryDto ) {
    try {
      const category = await this.categoryRepository.findOne({ 
        where: { 
          ...this.buildWhereByFilters( filters ),
          id 
        }
      });
      return category;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      await this.categoryRepository.update(id, {
        ...updateCategoryDto,
        id
      });

      const category = await this.findOne( id, { } );
  
      return category;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async remove(id: string) {
    try {
      await this.categoryRepository.update(id, {
        isAvailable: false,
      });

      return true;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  private async validate( createCategoryDto: CreateCategoryDto ){
    const exists = await this.categoryRepository.findOne({
      where: {
        name: ILike(`%${ createCategoryDto.name }%`),
        parentId: createCategoryDto.parentId,
      }
    });

    if ( exists ) throw new BadRequestException(`Already exist an category with name ${ createCategoryDto.name } and parentId ${ createCategoryDto.parentId }`)
    
    return true;
  }

  private buildWhereByFilters( filters: FindCategoryDto ){
    let where = { };
    if ( typeof filters.isAvailable === 'boolean' ) where = { ...where, isAvailable: filters.isAvailable };
    if ( filters.name ) where = { ...where, name: ILike(`%${ filters.name }%`) };
    if ( filters.parentId ) where = { ...where, parentId: filters.parentId };

    return where;
  }

  private handleDBError( error: any ){
    if (error.code === '23505') throw new BadRequestException(error.datail);
    
    this.logger.error(error);

    if ( !error.message ) throw new InternalServerErrorException(`Unexpected error, check server logs`);
    else throw new InternalServerErrorException(error.message)
  }
}
