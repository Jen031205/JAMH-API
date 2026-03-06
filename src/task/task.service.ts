import { Inject, Injectable } from '@nestjs/common';
import { ConnectConfig } from 'rxjs';
import { CreateTaskDto } from 'src/modules/auth/dto/create-task.dto';
import { UpdateTaskDto } from 'src/modules/auth/dto/update-task.dto';
import { Task } from 'src/modules/auth/entities/task.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskService {

    constructor(
        @Inject('MYSQL_CONNECTION') private db: any,
        private prisma: PrismaService
    ) { }

    private task: any[] = [];

    public async getTask(): Promise<Task[]> {
        const tasks = await this.prisma.task.findMany();
        return tasks;
    }

    public async getTaskById(id: number): Promise<Task> {
        const task = await this.prisma.task.findUnique({
            where: {
                id
            }
        });
        return task;
    }

    public async insert(tasks: CreateTaskDto): Promise<Task> {
        const task = await this.prisma.task.create({
            data: tasks
        });
        return task;
    }

    public async update(id: number, taskUpdate: UpdateTaskDto): Promise<Task> {
        const tasks = await this.prisma.task.update({
            where: { id },
            data: taskUpdate
        });
        return tasks;
    }

    public async delete(id: number): Promise<Task> {
        const task = await this.prisma.task.delete({
            where: { id }
        });
        return task;

    }
}
