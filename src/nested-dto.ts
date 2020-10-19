import { plainToClass, Transform, Type } from 'class-transformer';
import { IsArray, IsNumber, IsNumberString, IsOptional, IsString, ValidateNested } from 'class-validator';

class Filter {
    @IsString()
    id?: string;

    @IsArray()
    @IsNumber({}, { each: true})
    parentIds?: number[];
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
    @Transform(value => {
        try {
            return value.map(elem => parseInt(elem, 10));
        } catch (e) {
            return [];
        }
    })
    ids: number[]

    @ValidateNested()
    @Type(() => Filter)
    @Transform(value => {
        try {
            if (typeof value === 'string') {
                return plainToClass(Filter, JSON.parse(value));
            }

            return value;
        } catch (e) {
            return {};
        }
    })
    filters: Filter;
}