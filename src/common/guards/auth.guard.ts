import { CanActivate, ExecutionContext, UnauthorizedException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
import { UtilService } from "../services/util.service";
//import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly utilSvc: UtilService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {

        //Obtener el request de la petición
        const request: Request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);


        if (!token)
            throw new UnauthorizedException();

        try {
            //si el toexiste verificar el tiempo de expiracion
            const playload = await this.utilSvc.getPayload(token);

            //si  el token es funcional agregar el user (payload) y devolver el resultado 
            request["user"] = playload;
        } catch {
            throw new UnauthorizedException();
        }

        return true;

    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
}
