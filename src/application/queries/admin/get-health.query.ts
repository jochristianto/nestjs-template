import { HealthCheckResponse } from '@application/dtos';
import { LoggerService } from '@infrastructure/logger/logger.service';
import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, Query, QueryHandler } from '@nestjs/cqrs';

export class AdminGetHealthQuery extends Query<HealthCheckResponse> {}

@Injectable()
@QueryHandler(AdminGetHealthQuery)
export class AdminGetHealthQueryHandler implements IQueryHandler<AdminGetHealthQuery> {
  constructor(@Inject(LoggerService) private readonly logger: LoggerService) {
    this.logger.setContext(AdminGetHealthQueryHandler.name);
  }

  async execute() {
    this.logger.log({
      message: 'Admin checking health status',
      adminAction: true,
    });

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
    } satisfies HealthCheckResponse;
  }
}
