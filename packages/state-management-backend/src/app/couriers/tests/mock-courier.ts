import { JwtInfo } from '../../auth/interfaces/jwtinfo.type';
import { PaginationResult } from '../../common/interfaces/pagination-result.interface';
import { SearchQueryDto } from '../../customers/dto/search-query.dto';
import { CreateCourierDto } from '../dto/create-courier.dto';
import { CourierVehicle } from '../entities/courier-vehicle.entity';
import { Courier } from '../entities/courier.entity';

export const mockCourier: Courier = {
  courierId: 'courierId',
  status: 'offline',
  driversLicense: 'license',
  vehicle: new CourierVehicle(),
  userId: 'userId',
  role: 'courier',
  username: 'username',
  name: 'name',
  email: 'email@example.com',
  contactNumber: '+166113121',
};

export const mockCreateCourierDto: CreateCourierDto = {
  picture: '',
  lastname: '',
  driversLicense: '',
  name: 'name',
  email: 'email@example.com',
  contactNumber: '+166113121',
  username: 'username',
  password: 'password',
};

export const mockCurrentCourier: JwtInfo = {
  sub: 'userId',
  role: 'courier',
  iat: 0,
  exp: 0,
};

export const mockCourierPaginationResponse: PaginationResult<Courier> = {
  data: [],
  totalResults: 1,
  page: 1,
  totalPages: 2,
};

export const mockPaginationQuery: SearchQueryDto = {
  search: 'term',
  page: 2,
  limit: 10,
};
