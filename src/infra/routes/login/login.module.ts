import { Module } from '@nestjs/common'
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaService } from '@prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1d' }
  })],
  controllers: [LoginController],
  providers: [LoginService, PrismaService],
})
export class LoginModule { }