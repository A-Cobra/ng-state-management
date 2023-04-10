import { SearchQueryDto } from '../../customers/dto/search-query.dto';

export const paginationParameters = (queryParams: SearchQueryDto) => {
  const limit = queryParams.limit ? +queryParams.limit : 10;
  const page = queryParams.page ? +queryParams.page : 1;
  const search = queryParams.search ? queryParams.search : undefined;
  return { limit, page, search };
};
