import { Module } from '@nestjs/common'
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { PrismaService } from '@prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' }
    })
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UsersModule { }