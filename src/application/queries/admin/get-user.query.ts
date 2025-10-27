import { UserDetailResponse } from '@application/dtos';
import { UserMapper } from '@application/mappers/user.mapper';
import { UserService } from '@core/services/user.service';
import { LoggerService } from '@infrastructure/logger/logger.service';
import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, Query, QueryHandler } from '@nestjs/cqrs';

export class AdminGetUserQuery extends Query<UserDetailResponse> {
  constructor(public readonly userId: string) {
    super();
  }
}

@Injectable()
@QueryHandler(AdminGetUserQuery)
export class AdminGetUserQueryHandler implements IQueryHandler<AdminGetUserQuery> {
  constructor(
    private readonly userService: UserService,
    @Inject(LoggerService) private readonly logger: LoggerService,
  ) {
    this.logger.setContext(AdminGetUserQueryHandler.name);
  }

  async execute(query: AdminGetUserQuery) {
    const { userId } = query;

    this.logger.log({
      message: 'Admin fetching user',
      userId,
      adminAction: true,
    });

    const user = await this.userService.getUserById(userId);

    return UserMapper.toDetailResponse(user);
  }
}
