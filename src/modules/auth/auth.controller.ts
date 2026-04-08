import { Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { AppException } from 'src/common/app.exception';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller("api/auth")
export class AuthController {
  constructor(private authSvc: AuthService) { }
  @Get()
  public login(): string {
    return this.authSvc.login();
  }

  @Get("me")
  @ApiOperation({ summary: "Extrae el ID del usuario desde el token y busca la información" })
  public async getProfile(@Req() request: any): Promise<any> {
    const userSession = request['user'];
    return await this.authSvc.getUserById(userSession.id);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  public async refreshToken(@Req() request: any): Promise<any> {
    //obtener el usuario en sesion
    const userSession = request['user'];
    const user = await this.authSvc.getUserById(userSession.id);
    if (!user || !user.hash) {
      throw new AppException('Acceso denegado', HttpStatus.FORBIDDEN, '0');
    }

    //Comparar Token recibido con el guardado
    if (userSession.hash !== user.hash) {
      throw new AppException('Token inválido', HttpStatus.FORBIDDEN, '0');
    }

    //Si el token es valido - SE MODIFICA CUANDO SE ELABORA EL FRONT-
    return {
      access_token: 'nuevo_token_aqui',
      refresh_token: 'nuevo_refresh_token_aqui'
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  public async logout(@Req() request: any): Promise<void> {
    const sessionUser = request['user'];
    await this.authSvc.updateHash(sessionUser.id, null);
  }
}