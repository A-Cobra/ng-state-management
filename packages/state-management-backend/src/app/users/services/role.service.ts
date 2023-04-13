import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { Role } from '../entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: EntityRepository<Role>
  ) {}

  async create(dto: CreateRoleDto) {
    const role = this.roleRepository.create(dto);

    this.roleRepository.persistAndFlush(role);

    return role;
  }

  async modify(idRole: string, dto: CreateRoleDto) {
    const role = await this.roleRepository.findOne({ idRole });

    if (!role) throw new NotFoundException();

    this.roleRepository.assign(role, dto);

    this.roleRepository.flush();

    return role;
  }

  async delete(idRole: string) {
    const role = await this.roleRepository.findOne({ idRole });

    if (!role) throw new NotFoundException();

    this.roleRepository.remove({ idRole });
  }

  async findRole(roleName: string) {
    const role = await this.roleRepository.findOne({ roleName });

    if (!role) throw new NotFoundException();

    return role;
  }

  async get() {
    const roles = await this.roleRepository.findAll();

    return roles;
  }
}
