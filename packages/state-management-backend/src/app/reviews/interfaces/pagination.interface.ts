export interface PaginatedData<T> {
  data: T[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}
