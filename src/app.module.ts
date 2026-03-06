import { Module } from '@nestjs/common';
import { Task } from './modules/auth/entities/task.entity';
import { TaskModule } from './task/task.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TaskModule
  ],
})
export class AppModule { }