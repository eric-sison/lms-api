import { Module } from '@nestjs/common';
import { TrainingsModule } from './api/trainings/trainings.module';

@Module({
  imports: [TrainingsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
