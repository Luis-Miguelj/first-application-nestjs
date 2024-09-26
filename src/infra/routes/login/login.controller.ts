import type { LoginTypesBody } from "@/utils/types/login-types.body";
import { Post, Body, Controller } from "@nestjs/common";
import { LoginService } from "./login.service";

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post('login')
  async login(@Body() body: LoginTypesBody) {

    const { email, password } = body;

    const login = await this.loginService.login({
      email,
      password
    })

    if (login.error) {
      return {
        error: login.error
      }
    }

    return {
      access_token: login.access_token
    }

  }
}