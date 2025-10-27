import { HealthCheckResponse } from '@application/dtos';
import { HealthService } from '@core/services/health.service';
import { Injectable } from '@nestjs/common';
import { IQueryHandler, Query, QueryHandler } from '@nestjs/cqrs';

export class GetHealthQuery extends Query<HealthCheckResponse> {}

@Injectable()
@QueryHandler(GetHealthQuery)
export class GetHealthQueryHandler implements IQueryHandler<GetHealthQuery> {
  constructor(private readonly healthService: HealthService) {}

  async execute() {
    return this.healthService.getHealth();
  }
}
