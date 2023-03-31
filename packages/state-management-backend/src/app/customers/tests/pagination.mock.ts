export const mockPaginationQuery = {
  queryTerm: 'term',
  page: 1,
  limit: 10,
};

export const mockPaginationResponse = {
  data: [],
  metaData: {
    currentPage: mockPaginationQuery.page,
    totalItems: 10,
    totalPages: 0,
  },
};
