import { Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { AppException } from 'src/common/app.exception';

@Controller("api/auth")
export class AuthController {
  constructor(private authSvc: AuthService) { }
  @Get()
  public login(): string {
    return this.authSvc.login();
  }

  @Get("me")
  @ApiOperation({ summary: "Extrae el ID del usuario desde el token y busca la información " })
  public getProfile(): string {
  }
}
//Nuevo
@Post('refresh-token')
@HttpCode(HttpCode.OK)
@UseFGuards(AuthGuard)
public refreshToken(@Req() request: any) {
  //obtener el usuario en sesion
  const userSession = request['user'];
  const user = await this.authSvc.getUserById(userSession.id);
  if (!user || !user.hash) throw new AppException('Acceso denegado', HttpStatus.FORBIDDEN, '0');

  //Comparar Toquen recibido con el guardado

  if (userSession.hash != user.hash) throw new AppException('Token inválido', HttpStatus.FORBIDDEN, '0');

  //Si el token es valido -SE MODIFICA CUANDO SE ELABORA EL FRONT-
  return {
    access_token: '';
    refresh_token: '';

  }


  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  public async logout(@Req() request: any) {
    const sessionUser = request['user'];
    const user = await this.authSvc.updateHash(sessionUser.id, null);
    return user;
  }

}