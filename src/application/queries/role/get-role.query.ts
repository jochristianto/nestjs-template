import { RoleDetailResponse } from '@application/dtos';
import { RoleMapper } from '@application/mappers/role.mapper';
import { EntityNotFoundException } from '@core/exceptions/domain-exceptions';
import { IRoleRepository } from '@core/repositories/role.repository.interface';
import { Inject } from '@nestjs/common';
import { IQueryHandler, Query, QueryHandler } from '@nestjs/cqrs';
import { ROLE_REPOSITORY } from '@shared/constants/tokens';

export class GetRoleQuery extends Query<RoleDetailResponse> {
  constructor(public readonly id: string) {
    super();
  }
}

@QueryHandler(GetRoleQuery)
export class GetRoleQueryHandler implements IQueryHandler<GetRoleQuery> {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
  ) {}

  async execute(query: GetRoleQuery) {
    const { id } = query;
    const role = await this.roleRepository.findById(id);

    if (!role) {
      throw new EntityNotFoundException('Role', id);
    }

    // Use the mapper to convert to response DTO
    return RoleMapper.toDetailResponse(role);
  }
}
