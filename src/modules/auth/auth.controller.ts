import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller({})
export class AuthController {
  constructor(private authSvc: AuthService) {}
  @get()
  public login(): string {
    return this.authSvc.login();
  }
}
