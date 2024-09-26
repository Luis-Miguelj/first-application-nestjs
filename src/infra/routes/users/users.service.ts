import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";

import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';

interface UserProps {
    name: string;
    email: string;
    password: string;
}

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService, private jwt: JwtService) { }

    async getUsers() {
        return this.prisma.users.findMany();
    }

    async createUser(data: UserProps) {
        const { name, email, password } = data;

        const verifyUser = await this.prisma.users.findUnique({
            where: {
                email,
                name
            }
        })

        if (verifyUser) {
            return { error: 'Usuário já existe.' }
        }


        const hash = await new Promise<string>((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) reject(err);
                resolve(hash);
            });
        })


        const user = await this.prisma.users.create({
            data: {
                name,
                email,
                password: hash
            }
        })

        if (!user) {
            return { error: 'Erro ao criar o usuário.' }
        }



        const payload = {
            sub: user.id,
            username: user.name,
            admin: user.admin
        }

        const token = await this.jwt.signAsync(payload);

        return {
            message: 'Usuário criado com sucesso.',
            access_token: token
        }

    }
}