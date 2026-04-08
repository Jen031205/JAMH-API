export class User {
    id!: number;
    name!: string;
    lastname!: string;
    username!: string;
    password?: string;
    hash?: string | null;
    refreshToken?: string | null;
    created_at!: Date;
    rol_id?: number | null;
    tasks?: any[];
}