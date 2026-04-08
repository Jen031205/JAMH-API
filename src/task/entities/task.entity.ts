export class Task {
    id: number;
    name: string;
    description: string;
    priority: boolean;
    user_id: number;
    status?: boolean;
    created_at?: Date;
    updated_at?: Date;
}
