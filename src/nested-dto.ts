import { Transform, Type } from 'class-transformer';
import { IsArray, IsJSON, IsNumber, IsNumberString, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';

class Filter {
    @IsString()
    id?: string;

    @IsArray()
    @IsNumber({}, { each: true})
    parentIds?: string[];
}

class Context {
    // @IsArray()
    // @IsString({ each: true })
    // players: string[]

    // @IsString()
    // player: string
}

export class NestedDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsArray()
    @IsNumberString(null, { each: true })
    ids: number[]

    @ValidateNested()
    @Type(() => Filter)
    filters: Filter;
}