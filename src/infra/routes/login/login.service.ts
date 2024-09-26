import { Injectable } from "@nestjs/common";

import { LoginTypesBody } from "@/utils/types/login-types.body";
import { PrismaService } from "@prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";

import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService, private jwt: JwtService) { }

  async login(data: LoginTypesBody) {

    const user = await this.prisma.users.findUnique(
      {
        where: { email: data.email }
      });
    const verify = await bcrypt.compare(data.password, user.password);

    if (!verify) {
      return {
        error: new Error('Senha incorreta.')
      }
    }

    if (!user) {
      return {
        error: new Error('Esse usuário não existe.')
      }
    }

    const payload = {
      sub: user.id,
      username: user.name,
      admin: user.admin
    }

    const access_token = this.jwt.sign(payload);

    return { access_token };
  }

}