import { Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logging } from './logging.entity';
import { LoggingInterceptor } from './logging.interceptor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Logging]),
  ],
  providers: [
    LoggingService,
  ],
  exports: [
    LoggingInterceptor,
  ]
})
export class LoggingModule {}
