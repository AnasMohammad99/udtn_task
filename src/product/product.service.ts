import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { handleError } from 'src/exceptions/errors-handler';

@Injectable()
export class ProductService {
  constructor(private database: DatabaseService) {}

  async getAllProducts() {
    try {
      const products = await this.database.product.findMany({});
      return { data: products };
    } catch (error) {
      handleError(error);
    }
  }
  async getProductList(query: { limit: string; page: string }) {
    try {
      const page = Number(+query.page) || 1;
      const limit = Number(+query.limit) || 10;
      const skip = (page - 1) * limit;
      const products = await this.database.product.findMany({
        skip,
        take: limit,
      });
      return { data: products };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async addProduct(dto: CreateProductDto) {
    const product = await this.database.product.create({
      data: dto,
    });
    try {
      return { message: 'product added', product: product };
    } catch (error) {
      handleError(error);
    }
  }
  //-------------------------------------
  // async addProductList(dto: CreateProductDto) {
  //   try {
  //     const products = await this.database.product.createMany({
  //       data: dto,
  //     });
  //     return { message: 'products added', data: products };
  //   } catch (error) {
  //     handleError(error);
  //   }
  // }
  //-------------------------------------
  async getProductById(product_id: number) {
    try {
      const product = await this.database.product.findUnique({
        where: {
          id: product_id,
        },
      });
      return { data: product };
    } catch (error) {
      handleError(error, 'product_id is missing or must be an integer');
    }
  }
  //--------------------------------------
  async getProductByName(product_name: string) {
    try {
      const product = await this.database.product.findFirst({
        where: {
          product_name: product_name,
        },
      });
      return { data: product };
    } catch (error) {
      handleError(error, 'product_name is missing or must incorrect');
    }
  }
  //--------------------------------------
  async updateProduct(dto: UpdateProductDto, product_id: number) {
    try {
      const updatedProduct = await this.database.product.update({
        where: {
          id: product_id,
        },
        data: {
          ...dto,
        },
      });
      return { message: 'product updated', data: updatedProduct };
    } catch (error) {
      handleError(error, 'product_id is missing or must be an integer');
    }
  }
  //------------------------------------------
  async deleteProductById(product_id: number) {
    try {
      const deletedProduct = await this.database.product.delete({
        where: {
          id: product_id,
        },
      });
      return { message: 'product deleted', data: deletedProduct };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  //------------------------------------------
  async deleteAllProducts() {
    try {
      const deletedProducts = await this.database.product.deleteMany({});
      return { message: 'products deleted', data: deletedProducts };
    } catch (error) {
      handleError(error, 'product_id is missing or must be an integer');
    }
  }
}
