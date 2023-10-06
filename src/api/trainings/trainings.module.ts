import { Module } from '@nestjs/common';
import { TrainingsController } from './training.controller';
import { TrainingsService } from './trainings.service';

@Module({
  imports: [],
  controllers: [TrainingsController],
  providers: [TrainingsService],
})
export class TrainingsModule {}
