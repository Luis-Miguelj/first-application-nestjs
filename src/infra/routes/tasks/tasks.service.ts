import type { TaskTypeBody } from '@/utils/types/tasks-types.body'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@prisma/prisma.service'

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) { }

  async getTasks() {

  }

  async createTasks(data: TaskTypeBody, id: string) {

    const verifyUserId = await this.prisma.users.findUnique({
      where: {
        id
      }
    })

    if (!verifyUserId) {
      return {
        error: 'Usuário não encontrado'
      }

    }

    const task = await this.prisma.tasks.create({
      data: {
        title: data.title,
        content: data.content,
        status: data.status,
        recipientId: verifyUserId.id,
      }
    })

    if (!task) {
      return {
        error: 'Erro ao criar tarefa'
      }
    }

    return {
      tarefa: {
        title: task.title,
        content: task.content,
        status: task.status,
      }
    }
  }

}