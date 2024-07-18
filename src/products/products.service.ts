import { Injectable, Logger, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, Like, ILike } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { CreateProductDto, UpdateProductDto, FindProductDto } from './dto';
import { Product } from './entities/product.entity';
import { ProductCategoryService } from '../product-category/product-category.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    private readonly productCategoryService: ProductCategoryService,

    private readonly dataSource: DataSource,

  ){}
  
  async create(createProductDto: CreateProductDto) {
    try {

      const { categoryIds = [], ...productDetails } = createProductDto;
      
      const product = this.productRepository.create({
        ...productDetails, 
      });

      await this.productRepository.save( product );
      
      const productsCategories = await this.productCategoryService.createSeveral( product.id, categoryIds )

      return { ...product, productsCategories };

    } catch (error) {
      this.handleDBError(error);
    }
  }

  async findOrderedAlphabetically( paginationDto: PaginationDto ){
    try {
      const { limit = 10, offset = 0 } = paginationDto;

      const products = await this.productRepository.find({
        // take: limit,
        // skip: offset,
        order: {
          name: 'ASC',
        },
        relations: {
          categories: true
        }
      });


      return products;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async findAllOrderedAlphabeticallyByCategory( categoryId: string, isAvailable?: boolean | undefined ){
    const products = await this.productCategoryService.findAllProductsByCategoryId( categoryId );
    const finalProducts = products.filter( product => {
      if ( typeof isAvailable === 'boolean' ) return product.isAvailable === isAvailable;
      return true;
      //@ts-ignore
    })
    return finalProducts;
  }

  async findOrderedByTrending( paginationDto: PaginationDto ){
    try {
      const { limit = 10, offset = 0 } = paginationDto;

      const products = await this.productRepository.find({
        // take: limit,
        // skip: offset,
        relations: {
          categories: true
        }
      });
      return products;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async findAll( filters: FindProductDto, paginationDto: PaginationDto) {
    try {
      const { limit = 20, offset = 0 } = paginationDto;
      const products = await this.productRepository.find({
        where: this.buildWhereByFilters( filters ),
        // take: limit,
        // skip: offset,
        relations: {
          categories: true
        }
      });
      return products;
    } catch (error) {
      this.handleDBError( error );
    }
  }

  async findOne(id: string, filters: FindProductDto) {
    try {
      const product = await this.productRepository.findOne({
        where: {
          ...this.buildWhereByFilters( filters ),
          id
        },
        relations: {
          categories: true
        }
      });

      if ( !product ) throw new NotFoundException(`Product with id ${ id } and filters sended not found`);

      const finalCategories = this.buildCategoryTree( product.categories );
      
      return { ...product, categories: finalCategories };
    } catch (error) {
      this.handleDBError( error );
    }
  }

  async findByName( name: string, filters: FindProductDto ){
    try {
      const products = await this.productRepository.find({
        where: {
          ...this.buildWhereByFilters( filters ),
          name: ILike(`%${ name }%`)
        },
        relations: {
          categories: true
        },
      });
      return products;
    } catch (error) {
      this.handleDBError( error );
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const { categoryIds, ...dataToUpdate } = updateProductDto;

      await this.productRepository.update(id, {
        ...dataToUpdate,
        id
      });

      await this.productCategoryService.deleteAllByProductId( id );

      await this.productCategoryService.createSeveral( id, categoryIds )

      const product = await this.findOne( id, { } );
  
      return product;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async remove(id: string) {
    try {
      await this.productCategoryService.deleteAllByProductId( id );
      await this.productRepository.delete({ id });
      return true;
    } catch (error) {
      this.handleDBError( error );
    }
  }

  async rehabilitate( id: string ){
    await this.update( id, { isDeleted: false } );
    return true;
  }

  private buildWhereByFilters( filters: FindProductDto ){
    let where = { };
    if ( typeof filters.isAvailable === 'boolean' ) where = { ...where, isAvailable: filters.isAvailable };
    if ( typeof filters.isDeleted === 'boolean' ) where = { ...where, isDeleted: filters.isDeleted };
    if ( filters.name ) where = { ...where, name: ILike(`%${ filters.name }%`) };
    // if ( filters.categoryId ) where = { ...where, categoryId: filters.categoryId };
    // if ( filters.price ) where = { ...where, price: filters.price };
    // if ( filters.promotionalPrice ) where = { ...where, promotionalPrice: filters.promotionalPrice };
    if ( filters.stock ) where = { ...where, stock: filters.stock };
    if ( filters.slug ) where = { ...where, slug: filters.slug };
    return where;
  }

  private buildCategoryTree(categories: Category[]): Category[] {
    let tree: Category[] = [];
    let lookup: { [key: number]: Category } = {};

    categories.forEach(category => {
      lookup[category.id] = category;
      category.childrens = [];
    });

    categories.forEach(category => {
      if (category.parentId) lookup[category.parentId].childrens.push(category);
      else tree.push(category); 
    });

    return tree;
  }

  private handleDBError( error: any ){
    console.log(error);
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    
    if ( !error.message ) throw new InternalServerErrorException(`Unexpected error, check server logs`);
    else throw new InternalServerErrorException(error.message)
  }
}
