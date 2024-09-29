import { Controller, Body, Post, Get, Put, Param } from '@nestjs/common'
import { TasksService } from './tasks.service';
import type { TaskTypeBody } from '@/utils/types/tasks-types.body';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Get()
  async getAllTasks() {
    const { tasks, error } = await this.tasksService.getTasks()

    if (error) {
      return {
        error: new Error(error)
      }
    }

    return {
      tasks
    }
  }

  @Get(':id')
  async getTasks(@Param() params: { id?: string }) {
    const { id } = params

    if (id) {
      const tasksFilter = await this.tasksService.getTasks(id)

      if (tasksFilter.error) {
        return {
          error: new Error(tasksFilter.error)
        }
      }

      return {
        tasks: tasksFilter.tasks
      }
    }

  }

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


  @Put('update/:id')
  async updateTasks(@Body() body: TaskTypeBody, @Param() params: { id: string }) {
    const { title, content, status } = body

    const { id } = params

    const tasks = await this.tasksService.updateTasks({
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
      tarefa: tasks.task
    }

  }

}