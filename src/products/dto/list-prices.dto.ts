import { IsArray, IsNumber, IsPositive, IsString } from 'class-validator';

export class ListPricesDto {
    @IsNumber()
    @IsPositive()
    dolarValueInPesos: number;

    @IsString({ each: true })
    @IsArray()
    productsIds: string[];
}
