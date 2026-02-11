import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('api/task')
export class TaskController {

    constructor(private readonly taskSvc: TaskService) { }

    @Get()
    public getTask(): any {
        return this.taskSvc.getTask();
    }

    @Get(":id")
    public getTasksById(@Param("id", ParseIntPipe) id: number): any {
        console.log(typeof id);
        return this.taskSvc.getTaskById(id);
    }

    @Post()
    public insertTask(@Body() task: any) {
        return this.taskSvc.insert(task);
    }

    @Put("/:id")
    public updateTask(@Param("id", ParseIntPipe) id: number, @Body() task: any) {
        return this.taskSvc.update(id, task);
    }

    @Delete(":id")
    public deleteTask(@Param("id") id: any) {
        return this.taskSvc.delete(parseInt(id));
    }
}