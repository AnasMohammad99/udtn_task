import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { JwtAuthGuard } from 'src/jwtAuthGuard';
import { RoleGuard } from 'src/roleAuthGuard';
@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  //get all products
  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }
  //get products list based on queries
  @Get('/list')
  getProductList(
    @Query() query: { limit: string; page: string; product_type: string },
  ) {
    return this.productService.getProductList(query);
  }
  //get product by id
  @Get('/:product_id')
  getProductById(@Param('product_id') product_id: string) {
    return this.productService.getProductById(+product_id);
  }
  //add product
  @UseGuards(RoleGuard)
  @Post()
  addProduct(@Body() dto: CreateProductDto) {
    return this.productService.addProduct(dto);
  }
  //add product list
  // @Post('/list')
  // addProductList(@Body() dto: CreateChepBox) {
  //   return this.productService.addProductList(dto);
  // }
  //update product by id
  @UseGuards(RoleGuard)
  @Patch('/:product_id')
  updateProduct(
    @Body() dto: UpdateProductDto,
    @Param('product_id') product_id: string,
  ) {
    return this.productService.updateProduct(dto, +product_id);
  }
  //delete product by id
  @UseGuards(RoleGuard)
  @Delete('/:product_id')
  deleteProductById(@Param('product_id') product_id: string) {
    return this.productService.deleteProductById(+product_id);
  }
  //delete all products
  @UseGuards(RoleGuard)
  @Delete()
  deleteAllProducts() {
    return this.productService.deleteAllProducts();
  }
}
