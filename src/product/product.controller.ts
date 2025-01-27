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
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) { }

  //get all products
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getAllProducts() {
    return this.productService.getAllProducts();
  }
  //get products list based on queries
  @Get('/list')
  @ApiOperation({ summary: 'Get product list' })
  @ApiBearerAuth()
  @ApiQuery({ name: 'limit', description: 'Limit number of products', required: false })
  @ApiQuery({ name: 'page', description: 'Page number', required: false })
  @ApiQuery({ name: 'product_type', description: 'Type of product', required: false })
  @ApiResponse({ status: 200, description: 'Product list retrieved successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getProductList(
    @Query() query: { limit: string; page: string; product_type: string },
  ) {
    return this.productService.getProductList(query);
  }
  //get product by id
  @Get('/:product_id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiBearerAuth()
  @ApiParam({ name: 'product_id', description: 'ID of the product' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getProductById(@Param('product_id') product_id: string) {
    return this.productService.getProductById(+product_id);
  }
  //add product
  @UseGuards(RoleGuard)
  @Post()
  @ApiOperation({ summary: 'Add a new product' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Product added successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
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
  @ApiOperation({ summary: 'Update product information' })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateProductDto })
  @ApiParam({ name: 'product_id', description: 'ID of the product' })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Product ID is missing or must be an integer' })
  updateProduct(
    @Body() dto: UpdateProductDto,
    @Param('product_id') product_id: string,
  ) {
    return this.productService.updateProduct(dto, +product_id);
  }
  //delete product by id
  @UseGuards(RoleGuard)
  @Delete('/:product_id')
  @ApiOperation({ summary: 'Delete product by ID' })
  @ApiBearerAuth()
  @ApiParam({ name: 'product_id', description: 'ID of the product' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Product ID is missing or must be an integer' })
  deleteProductById(@Param('product_id') product_id: string) {
    return this.productService.deleteProductById(+product_id);
  }
  //delete all products
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'Delete all products' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'All products deleted successfully' })
  @Delete()
  deleteAllProducts() {
    return this.productService.deleteAllProducts();
  }
}
