import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiV1Module } from './api-v1/api-v1.module';

@Module({
  imports: [ApiV1Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
