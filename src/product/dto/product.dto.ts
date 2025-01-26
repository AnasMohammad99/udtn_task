import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  product_name: string;
  @IsString()
  @IsNotEmpty()
  product_description: string;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsInt()
  @IsNotEmpty()
  stock_quantity: number;
}
export class UpdateProductDto {
  @IsString()
  @IsOptional()
  product_name: string;
  @IsString()
  @IsOptional()
  product_description: string;
  @IsNumber()
  @IsOptional()
  price_: number;
  @IsInt()
  @IsOptional()
  stock_quantity: number;
}
