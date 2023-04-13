import { JwtInfo } from '../../auth/interfaces/jwtinfo.type';
import { PaginationResult } from '../../common/interfaces/pagination-result.interface';
import { SearchQueryDto } from '../../common/dtos/search-query.dto';
import { CreateCourierDto } from '../dto/create-courier.dto';
import { CourierVehicle } from '../entities/courier-vehicle.entity';
import { Courier } from '../entities/courier.entity';
import { Role } from '../../roles/entities/role.entity';

export const mockCourier: Courier = {
  status: false,
  driversLicense: 'license',
  vehicle: new CourierVehicle(),
  userId: 'userId',
  username: 'username',
  name: 'name',
  email: 'email@example.com',
  contactNumber: '+166113121',
  idCourier: '',
  payroll: undefined,
  user: undefined,
  role: new Role(),
  password: '',
  isLoggedIn: false,
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
