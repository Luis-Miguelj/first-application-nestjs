import { Controller, Get, Post, Body } from "@nestjs/common";
import { UserService } from "./users.service";
import { UserTypeBody } from '@/utils/types/users-types.body';

@Controller()
export class UserController {
  constructor(private readonly usersService: UserService) { }

  @Get('/users')
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Post('/users')
  async createUser(@Body() body: UserTypeBody) {

    const { email, name, password } = body;

    const users = await this.usersService.createUser({
      name,
      email,
      password
    });


    if (users.error) {
      return {
        error: users.error
      }
    }

    return {
      message: users.message,
      access_token: users.access_token
    }
  }

}