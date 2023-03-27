import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class BusinessSearchDto {

    @ApiProperty({ type: [String] })
    @IsOptional()
    @Transform(({ value }) => (Array.isArray(value) ? value : value.split(',')))
    categories?: string[];

    @ApiProperty()
    @IsPositive()
    page: number;

    @ApiProperty()
    @IsPositive()
    pageSize: number;
}