import { IsString, MinLength, IsBoolean, IsOptional, IsArray, IsUUID } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class FindCategoryDto {
    @IsString()
    @MinLength(1)
    @IsOptional()
    name?: string;

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

    @IsUUID()
    @IsOptional()
    parentId?: string;
}
