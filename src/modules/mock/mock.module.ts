import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '../cache/cache.module';
import { Mock } from './entities/mock.entity';
import { MockController } from './mock.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Mock]), CacheModule],
  controllers: [MockController],
})
export class MockModule {}
