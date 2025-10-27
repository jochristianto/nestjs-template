import { FileResponse } from '@application/dtos';
import { StorageService } from '@core/services/storage.service';
import { IQueryHandler, Query, QueryHandler } from '@nestjs/cqrs';
import { FileMapper } from '../../mappers/file.mapper';

export interface IGetAllFilesResult extends Query<IGetAllFilesResult> {
  files: FileResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class GetAllFilesQuery {
  constructor(
    public readonly page: number = 1,
    public readonly limit: number = 20,
  ) {}
}

@QueryHandler(GetAllFilesQuery)
export class GetAllFilesQueryHandler implements IQueryHandler<GetAllFilesQuery> {
  constructor(
    private readonly storageService: StorageService,
    private readonly fileMapper: FileMapper,
  ) {}

  async execute(query: GetAllFilesQuery) {
    const { page, limit } = query;
    const result = await this.storageService.getAllFiles(page, limit);

    return {
      files: await this.fileMapper.toResponseDtoList(result.files),
      total: result.total,
      page,
      limit,
      totalPages: Math.ceil(result.total / limit),
    };
  }
}
