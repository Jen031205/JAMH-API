import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Req,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('api/user')
@ApiTags('User')
@UseGuards(AuthGuard)
export class UserController {
    constructor(private userSvc: UserService) { }

    @Get()
    @ApiOperation({ summary: 'Obtiene lista de usuarios' })
    public async getUsers(): Promise<User[]> {
        return await this.userSvc.getUsers();
    }

    @Get('profile')
    @HttpCode(200)
    @ApiOperation({ summary: 'Obtiene el perfil del usuario autenticado' })
    public async getUserProfile(@Req() req: any): Promise<User> {
        const user = await this.userSvc.getUserById(req.user.id);
        if (!user) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    @Get(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Obtiene un usuario por ID' })
    public async getUserById(
        @Param('id', ParseIntPipe) id: number
    ): Promise<User> {
        const user = await this.userSvc.getUserById(id);
        if (!user) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }
        return user;
    }
}
