import { ReadinessResponse } from '@application/dtos';
import { HealthService } from '@core/services/health.service';
import { Injectable } from '@nestjs/common';
import { IQueryHandler, Query, QueryHandler } from '@nestjs/cqrs';

export class GetReadinessQuery extends Query<ReadinessResponse> {}

@Injectable()
@QueryHandler(GetReadinessQuery)
export class GetReadinessQueryHandler implements IQueryHandler<GetReadinessQuery> {
  constructor(private readonly healthService: HealthService) {}

  async execute() {
    return this.healthService.getReadiness();
  }
}
