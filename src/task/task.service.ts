import { Inject, Injectable } from '@nestjs/common';
import { ConnectConfig } from 'rxjs';
import { CreateTaskDto } from 'src/modules/auth/dto/create-task.dto';
import { UpdateTaskDto } from 'src/modules/auth/dto/update-task.dto';
import { Task } from 'src/modules/auth/entities/task.entity';

@Injectable()
export class TaskService {

    constructor(
        @Inject('MYSQL_CONNECTION') private db: any
    ) { }

    private task: any[] = [];

    public async getTask(): Promise<Task> {
        const query = `SELECT * FROM task`;
        const [result]: any = await this.db.query(query);

        return result;
    }

    public async getTaskById(id: number): Promise<Task> {
        const query = `SELECT * FROM task WHERE id=${id}`;
        const [result] = await this.db.query(query)
        return result[0];
    }

    public async insert(tasks: CreateTaskDto): Promise<Task> {
        const sql = `INSERT INTO tasks (name, description, priority, user_id)VALUES ('${tasks.name}', '${tasks.description}', ${tasks.priority}, ${tasks.user_id})`
        const [result] = await this.db.query(sql);
        const insertId = result.insertId;

        const row = await this.getTaskById(insertId);
        return row;
    }

    public async update(id: number, taskUpdate: UpdateTaskDto): Promise<Task> {
        const task = await this.getTaskById(id);

        task.name = taskUpdate.name ? taskUpdate.name : task.name;
        task.description = taskUpdate.description ?? task.description;
        task.priority = taskUpdate.priority ?? task.priority;

        const query = `
        UPDATE task 
        SET name='${task.name}',
         description='${task.description}',
          priority=${task.priority}
           WHERE id=${id}`

        await this.db.query(query);
        return await this.getTaskById(id);
    }

    public async delete(id: number): Promise<boolean> {
        const query = `DELETE FROM task WHERE id=${id}`;
        const [result] = await this.db.query(query);

        return result.affectedRows > 0;

    }
}
