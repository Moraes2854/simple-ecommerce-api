import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { ProductCategory } from '../product-category/entities/product-category.entity';
import { User } from '../auth/entities/user.entity';

import categories from './data/categories.json'
import product_categories from './data/product_category.json'
import products from './data/products.json'
import users from './data/users.json'


@Injectable()
export class SeedService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>,

        @InjectRepository( Category )
        private readonly categoryRepository: Repository<Category>,

        @InjectRepository( Product )
        private readonly productRepository: Repository<Product>,

        @InjectRepository( ProductCategory )
        private readonly productCategoryRepository: Repository<ProductCategory>,
    
    ){
    }

    async execute(){
        await this.createUsers();
        await this.createCategories();
        await this.createProducts();
        await this.createProductsCategories();
    }

    async createUsers(){
        for (const userData of users) {
            const user = this.userRepository.create(userData);
            await this.userRepository.save( user );
        }
    }

    async createCategories(){
        for (const categoryData of categories) {
            const category = this.categoryRepository.create( categoryData );
            await this.categoryRepository.save( category );
        }
    }

    async createProducts(){
        for (const productData of products) {
            const product = this.productRepository.create( productData );
            await this.productRepository.save( product );
        }
    }

    async createProductsCategories(){
        for (const productCategoryData of product_categories) {
            const productCategory = this.productCategoryRepository.create( productCategoryData );
            await this.productCategoryRepository.save( productCategory );
        }
    }
}
