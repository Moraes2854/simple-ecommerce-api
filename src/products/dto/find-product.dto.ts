import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength, IsBoolean } from "class-validator";
import { Transform, Type } from "class-transformer";

const optionalBooleanMapper = new Map([
    ['undefined', undefined],
    ['true', true],
    ['false', false],
]);

export class FindProductDto {
    @ApiProperty({
        description: 'Name of product',
        required: false,
    })
    @IsString()
    @MinLength(1)
    @IsOptional()
    name?: string;


    @ApiProperty({
        description: 'price of product',
        required: false,
        type: Number,
    })
    @IsNumber()
    @IsOptional()
    @IsPositive()
    @Type( () => Number )
    pricePesos?: number;

    @ApiProperty({
        description: 'promotional price pesos of product',
        required: false,
        type: Number,
    })
    @IsNumber()
    @IsOptional()
    @IsPositive()
    @Type( () => Number )
    promotionalPricePesos?: number;

    @ApiProperty({
        description: 'price dollar of product',
        required: false,
        type: Number,
    })
    @IsNumber()
    @IsOptional()
    @IsPositive()
    @Type( () => Number )
    priceDollar?: number;

    @ApiProperty({
        description: 'promotional price dollar of product',
        required: false,
        type: Number,
    })
    @IsNumber()
    @IsOptional()
    @IsPositive()
    @Type( () => Number )
    promotionalPriceDollar?: number;


    @ApiProperty({
        description: 'slug of product',
        required: false,
    })
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiProperty({
        description: 'stock of product',
        required: false,
        type: Number,
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    @Type( () => Number )
    stock?: number;

    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => {
        if ( value === 'true' ) return true;
        if ( value === 'false' ) return false;
        return value;
    })
    isAvailable?: boolean;

    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => {
        if ( value === 'true' ) return true;
        if ( value === 'false' ) return false;
        return value;
    })
    isDeleted?: boolean;

}
