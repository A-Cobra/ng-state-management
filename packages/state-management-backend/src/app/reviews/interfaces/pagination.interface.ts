import { Review } from '../entities/review.entity';
export interface PaginatedData {
  data: Review[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}
