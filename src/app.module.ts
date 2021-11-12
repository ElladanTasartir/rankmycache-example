import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from './modules/cache/cache.module';
import { MockModule } from './modules/mock/mock.module';
import { AppController } from './app.controller';
import { ormConfig } from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), CacheModule, MockModule],
  controllers: [AppController],
})
export class AppModule {}
