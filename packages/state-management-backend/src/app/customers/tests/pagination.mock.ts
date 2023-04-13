import { PaginationResult } from '../../common/interfaces/pagination-result.interface';
import { User } from '../../users/entities/user.entity';
import { SearchQueryDto } from '../../common/dtos/search-query.dto';

export const mockPaginationQuery: SearchQueryDto = {
  search: 'term',
  page: 2,
  limit: 10,
};

export const mockPaginationResponse: PaginationResult<User> = {
  data: [] as User[],
  totalResults: 4,
  page: 2,
  totalPages: 2,
};
