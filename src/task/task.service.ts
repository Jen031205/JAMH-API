import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from 'src/modules/auth/dto/create-task.dto';

@Injectable()
export class TaskService {

    private task: any[] = [];

    public getTask() {
        return this.task;
    }

    public getTaskById(id: number): any {
        var task = this.task.find(t => t.id == id);
        return 'Tarea con el id ${ id }';
    }

    public insert(task: CreateTaskDto): string {
        var id = this.task.length + 1;
        var insertedTask = this.task.push({
            ...task,
            id: id
        });


        return this.task[insertedTask - 1];
    }

    public update(id: number, task: any): any {
        const taskUpdated = this.task.map(t => {
            if (t.id == id) {
                if (task.name) t.name = task.name;
                if (task.description) t.description = task.description;
                if (task.priority) t.priority = task.priority;
            }
            return t;
        });
        return taskUpdated;
    }
    public delete(id: number): string {
        const array = this.task.filter(t => t.id != id);
        this.task = array;
        return "Task Deleted";
    }
}
