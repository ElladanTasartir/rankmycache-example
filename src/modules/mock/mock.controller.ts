import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacheService } from '../cache/cache.service';
import { InsertMockDTO } from './dtos/insert-mock.dto';
import { UpdateMockDTO } from './dtos/update-mock.dto';
import { Mock } from './entities/mock.entity';

const generateDelay = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

@Controller('mocks')
export class MockController {
  constructor(
    @InjectRepository(Mock)
    private readonly mockRepository: Repository<Mock>,
    private readonly cacheService: CacheService,
  ) {}

  @Get(':id')
  async getMock(@Param('id') id: string): Promise<Mock> {
    const cachedResponse = await this.cacheService.get<Mock>(`mocks-${id}`);

    if (cachedResponse) {
      return cachedResponse;
    }

    await generateDelay(500);
    const mock = await this.mockRepository.findOne(id);

    await this.cacheService.set<Mock>(`mocks-${id}`, mock);
    return mock;
  }

  @Get()
  async getMocks(): Promise<Mock[]> {
    const cachedResponse = await this.cacheService.get<Mock[]>('mocks');

    if (cachedResponse) {
      return cachedResponse;
    }

    await generateDelay(500);
    const mocks = await this.mockRepository.find();

    await this.cacheService.set<Mock[]>('mocks', mocks);

    return mocks;
  }

  @Post()
  async createMock(@Body() insertMockDTO: InsertMockDTO): Promise<Mock> {
    const createdMock = this.mockRepository.create(insertMockDTO);

    await this.mockRepository.save(createdMock);

    await this.cacheService.delete('mocks');

    return createdMock;
  }

  @Put(':id')
  async updateMock(
    @Param('id') id: number,
    @Body() updateMockDTO: UpdateMockDTO,
  ): Promise<Mock> {
    const foundMock = await this.mockRepository.findOne(id);

    if (!foundMock) {
      throw new NotFoundException(`Mock with ID '${id}' does not exist`);
    }

    foundMock.name = updateMockDTO.name;

    await this.cacheService.delete('mocks');
    await this.cacheService.set(`mocks-${id}`, foundMock);

    return this.mockRepository.save(foundMock);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteMock(@Param('id') id: number): Promise<void> {
    const foundMock = await this.mockRepository.findOne(id);

    if (!foundMock) {
      throw new NotFoundException(`Mock with ID '${id}' does not exist`);
    }

    await this.mockRepository.remove(foundMock);

    await this.cacheService.delete('mocks');
    await this.cacheService.delete(`mocks-${id}`);

    return;
  }
}
