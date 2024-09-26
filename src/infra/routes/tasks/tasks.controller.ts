import { Controller, Body, Post, Get, Param } from '@nestjs/common'
import { TasksService } from './tasks.service';
import type { TaskTypeBody } from '@/utils/types/tasks-types.body';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Get()
  async getTasks() { }

  @Post(':id')
  async create(@Body() body: TaskTypeBody, @Param() params: { id: string }) {

    const { title, content, status } = body
    const { id } = params


    const tasks = await this.tasksService.createTasks({
      title,
      content,
      status,
    }, id)

    if (tasks.error) {
      return {
        error: new Error(tasks.error)
      }
    }

    return {
      tarefa: tasks.tarefa
    }
  }

}