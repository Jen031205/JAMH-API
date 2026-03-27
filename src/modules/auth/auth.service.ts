import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(): string {
    return 'Authenticated';
  }

  //Nuevo
  public async getUserById(id: number) {
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
