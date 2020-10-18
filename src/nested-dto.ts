import { Transform, Type } from 'class-transformer';
import { IsArray, IsJSON, IsNumber, IsNumberString, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';

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
    @IsNumberString(null, { each: true })
    ids: number[]

    // NOTE: seems to not be validating that the nested data
    // conforms to the type Filter.
    // http://localhost:3000/test?name=Jeremy&ids=1&ids=2&filters={"parentIds":["1","2","3"]}
    // still works even if I would expect it to fail
    @ValidateNested()
    @Type(() => Filter)
    @Transform(value => {
        try {
            return JSON.parse(value);
        } catch (e) {
            return {};
        }
    })
    filters: Filter;
}