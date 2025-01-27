import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Name of the product', example: 'Product Name' })
  @IsString()
  @IsNotEmpty()
  product_name: string;
  @ApiProperty({ description: 'Description of the product', example: 'Product Description' })
  @IsString()
  @IsNotEmpty()
  product_description: string;
  @ApiProperty({ description: 'Price of the product', example: 99.99 })
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @ApiProperty({ description: 'stock_quantity of the product', example: 56 })
  @IsInt()
  @IsNotEmpty()
  stock_quantity: number;
}
export class UpdateProductDto {
  @ApiProperty({ description: 'Name of the product', example: 'Product Name' })
  @IsString()
  @IsOptional()
  product_name: string;
  @ApiProperty({ description: 'Description of the product', example: 'Product Description' })
  @IsString()
  @IsOptional()
  product_description: string;
  @ApiProperty({ description: 'Price of the product', example: 99.99 })
  @IsNumber()
  @IsOptional()
  price_: number;
  @ApiProperty({ description: 'stock_quantity of the product', example: 56 })
  @IsInt()
  @IsOptional()
  stock_quantity: number;
}
