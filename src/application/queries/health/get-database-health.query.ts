import { DatabaseHealthResponse } from '@application/dtos';
import { HealthService } from '@core/services/health.service';
import { Injectable } from '@nestjs/common';
import { IQueryHandler, Query, QueryHandler } from '@nestjs/cqrs';

export class GetDatabaseHealthQuery extends Query<DatabaseHealthResponse> {}

@Injectable()
@QueryHandler(GetDatabaseHealthQuery)
export class GetDatabaseHealthQueryHandler implements IQueryHandler<GetDatabaseHealthQuery> {
  constructor(private readonly healthService: HealthService) {}

  async execute() {
    return this.healthService.getDatabaseHealth();
  }
}
