import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '@infra/routes/users/users.module';
import { LoginModule } from '@infra/routes/login/login.module';
import { TasksModule } from '@infra/routes/tasks/tasks.module';

@Module({
  imports: [
    UsersModule,
    LoginModule,
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
