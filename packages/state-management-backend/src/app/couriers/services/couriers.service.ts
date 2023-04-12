import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCourierDto } from '../dto/create-courier.dto';
import { UpdateCourierDto } from '../dto/update-courier.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Courier } from '../entities/courier.entity';
import { EntityRepository, FilterQuery, Loaded } from '@mikro-orm/core';
import { UsersDirectoryService } from '../../users/services/users-directory.service';
import { ValidRoles } from '../../auth/interfaces/valid-roles.type';
import { SearchQueryDto } from '../../common/dtos/search-query.dto';
import { PaginationResult } from '../../common/interfaces/pagination-result.interface';
import { paginationParameters } from '../../common/methods/pagination-parameters';
import { extractUser } from '../../common/methods/extract-user';
import { JwtInfo } from '../../auth/interfaces/jwtinfo.type';

@Injectable()
export class CouriersService {
  constructor(
    @InjectRepository(Courier)
    private readonly courierRepository: EntityRepository<Courier>,
    private readonly directoryService: UsersDirectoryService
  ) {}

  async create(createCourierDto: CreateCourierDto) {
    const courier = this.courierRepository.create(createCourierDto);

    const { user } = extractUser(courier);

    await this.directoryService.createUserCredentials({
      user: user,
      email: createCourierDto.email,
      password: createCourierDto.password,
      role: ValidRoles.courier,
    });
    await this.courierRepository.persistAndFlush(courier);
    return courier;
  }

  async findAll(
    queryParams: SearchQueryDto
  ): Promise<PaginationResult<Loaded<Courier>>> {
    const { limit, page, search } = paginationParameters(queryParams);

    let queryOptions: FilterQuery<Courier> = { deleted: false };

    if (search) {
      queryOptions = {
        $and: [{ name: { $ilike: `%${search}%` } }, { deleted: false }],
      };
    }

    const [data, total] = await this.courierRepository.findAndCount(
      queryOptions,
      {
        offset: (page - 1) * limit,
        limit,
      }
    );

    const totalPages = Math.ceil(total / limit);
    return {
      data,
      page,
      totalResults: total,
      totalPages,
    };
  }

  async findOne(userId: string, currentCourier: JwtInfo): Promise<Courier> {
    const courier = await this.findById(userId);
    if (currentCourier.role === ValidRoles.courier)
      this.validateSameCourier(courier, currentCourier);

    return courier;
  }

  async update(
    id: string,
    updateCourierDto: UpdateCourierDto,
    currentCourier: JwtInfo
  ) {
    const courier = await this.findById(id);

    if (currentCourier.role === ValidRoles.courier)
      this.validateSameCourier(courier, currentCourier);

    this.courierRepository.assign(courier, updateCourierDto);
    await this.courierRepository.flush();

    return { ...courier, ...updateCourierDto };
  }

  async remove(id: string): Promise<{ message: string }> {
    const courier = await this.findById(id);
    courier.deleted = true;
    await this.courierRepository.persistAndFlush(courier);
    return { message: 'Courier Removed Successfully' };
  }

  async findById(id: string): Promise<Courier> {
    const [find, count] = await this.courierRepository.findAndCount(
      { $and: [{ userId: id }, { deleted: false }] },
      { limit: 1 }
    );
    if (count === 0) {
      throw new NotFoundException(`user with id: ${id} not found`);
    }
    return find[0];
  }

  validateSameCourier(foundCourier: Courier, jwtUser: JwtInfo) {
    if (foundCourier.userId !== jwtUser.sub) {
      throw new UnauthorizedException('Not Authorized to perform this action');
    }
    return;
  }
}
