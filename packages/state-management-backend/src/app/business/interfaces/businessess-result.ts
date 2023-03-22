import { BusinessHq } from "../entities/business.entity";

export interface BusinessessResult {
    businessess: BusinessHq[];

    totalBusinessess: number;

    totalPages: number;
}