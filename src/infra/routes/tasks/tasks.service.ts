import type { TaskTypeBody } from '@/utils/types/tasks-types.body'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@prisma/prisma.service'

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) { }

  async getTasks(id?: string) {
    if (id) {
      const tasks = await this.prisma.tasks.findMany({
        where: {
          recipientId: id
        }
      })

      if (!tasks) {
        return {
          error: 'Tarefa não encontrada'
        }
      }

      return {
        tasks
      }
    }

    const allTasks = await this.prisma.tasks.findMany()

    if (!allTasks) {
      return {
        error: 'Nenhuma tarefa encontrada'
      }
    }

    return {
      tasks: allTasks
    }
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