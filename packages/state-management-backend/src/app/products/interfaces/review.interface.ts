import { Review } from '../entities/review.entity';
export interface ReviewPagination {
  data: Review[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}
