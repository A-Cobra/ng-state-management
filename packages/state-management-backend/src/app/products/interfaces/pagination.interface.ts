import { Product } from '../entities/product.entity';
import { Review } from '../entities/review.entity';
export interface PaginatedData {
  data: Review[] | Product[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}
