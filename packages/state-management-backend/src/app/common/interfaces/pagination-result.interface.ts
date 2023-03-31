export interface PaginationResult<T> {
  data: T[];
  totalResults: number;
  page: number;
  totalPages: number;
}
