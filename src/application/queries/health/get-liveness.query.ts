import { LivenessResponse } from '@application/dtos';
import { HealthService } from '@core/services/health.service';
import { Injectable } from '@nestjs/common';
import { IQueryHandler, Query, QueryHandler } from '@nestjs/cqrs';

export class GetLivenessQuery extends Query<LivenessResponse> {}

@Injectable()
@QueryHandler(GetLivenessQuery)
export class GetLivenessQueryHandler implements IQueryHandler<GetLivenessQuery> {
  constructor(private readonly healthService: HealthService) {}

  async execute() {
    return this.healthService.getLiveness();
  }
}
