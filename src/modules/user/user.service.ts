import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    public async getUsers(): Promise<User[]> {
        return await this.prisma.user.findMany({
            orderBy: [{ name: 'asc' }],
            select: {
                id: true,
                name: true,
                lastname: true,
                username: true,
                created_at: true,
            },
        });
    }

    public async getUserById(id: number): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                lastname: true,
                username: true,
                created_at: true,
            },
        });
    }

    public async getTasksByUserId(id: number): Promise<any[] | null> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                tasks: true,
            },
        });
        return user?.tasks || null;
    }

    public async createUser(createUserDto: CreateUserDto): Promise<User> {
        return await this.prisma.user.create({
            data: {
                name: createUserDto.name,
                lastname: createUserDto.lastname,
                username: createUserDto.username,
                password: createUserDto.password,
            },
        });
    }

    public async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.getUserById(id);
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }

        return await this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }

    public async deleteUser(id: number): Promise<User> {
        const user = await this.getUserById(id);
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }

        return await this.prisma.user.delete({
            where: { id },
        });
    }
}
