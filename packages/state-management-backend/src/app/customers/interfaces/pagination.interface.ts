export interface Pagination {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T;
  metaData: {
    currentPage: number;
    totalItems: number;
    totalPages: number;
  };
}
