import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
constructor(private readonly jwtSvc) { }
export class UtilService {
    public async hashPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }
    public async checkPassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
    public async generateJWT(payload: any, expiresIn: any = '60s'): Promise<string> {
        return await this.jwtSvc.signAsync(payload,
            { expiresIn });
    }