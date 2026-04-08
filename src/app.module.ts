import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    AuthModule,
    TaskModule,
    UserModule
  ],
})
export class AppModule { }