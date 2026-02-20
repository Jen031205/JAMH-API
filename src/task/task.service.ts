import { Inject, Injectable } from '@nestjs/common';
import { ConnectConfig } from 'rxjs';
import { CreateTaskDto } from 'src/modules/auth/dto/create-task.dto';

@Injectable()
export class TaskService {

    constructor(
        @Inject('MYSQL_CONNECTION') private db: any
    ) { }

    private task: any[] = [];

    public async getTask(): Promise<any> {
        const query = 'SELECT * FROM task';
        const [result]: any = await this.db.query(query);

        return result;
    }

    public async getTaskById(id: number): Promise<any> {



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
