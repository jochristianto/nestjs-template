import { FileResponse } from '@application/dtos';
import { StorageService } from '@core/services/storage.service';
import { IQueryHandler, Query, QueryHandler } from '@nestjs/cqrs';
import { FileMapper } from '../../mappers/file.mapper';

export class GetUserFilesQuery extends Query<FileResponse[]> {
  constructor(public readonly userId: string) {
    super();
  }
}

@QueryHandler(GetUserFilesQuery)
export class GetUserFilesQueryHandler implements IQueryHandler<GetUserFilesQuery> {
  constructor(
    private readonly storageService: StorageService,
    private readonly fileMapper: FileMapper,
  ) {}

  async execute(query: GetUserFilesQuery) {
    const { userId } = query;
    const files = await this.storageService.getFilesByUserId(userId);

    return this.fileMapper.toResponseDtoList(files);
  }
}
