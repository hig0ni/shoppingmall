import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { IOAuthUser } from './interfaces/auth-service.interfaces';
import { DynamicAuthGuard } from './guards/dynamic-auth.guard';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  @UseGuards(DynamicAuthGuard)
  @Get('/login/:social')
  async loginOAuth(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    return this.authService.loginOAuth({ req, res });
  }
}
