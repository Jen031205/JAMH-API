import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }

  login(): string {
    return 'Authenticated';
  }

  public async getUserById(id: number): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: { id }
    });
  }

  public async updateHash(user_id: number, hash: string | null): Promise<User> {
    return await this.prisma.user.update({
      where: { id: user_id },
      data: { hash }
    });
  }
}
