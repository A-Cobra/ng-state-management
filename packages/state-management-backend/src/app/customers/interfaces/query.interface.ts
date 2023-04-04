import { Pagination } from './pagination.interface';

export interface CustomerSearchQuery extends Pagination {
  queryTerm: string;
}
