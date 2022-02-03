import { forwardRef, Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExercisesSchema, WorkoutSchema } from './entities/workout.entity';
@Module({
  imports: [
    forwardRef(() => HttpModule),
    TypeOrmModule.forFeature([ExercisesSchema, WorkoutSchema]),
  ],
  controllers: [WorkoutController],
  providers: [WorkoutService],
})
export class WorkoutModule {}
