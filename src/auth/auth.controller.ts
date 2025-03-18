import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    // Armazena os dados do usuário na sessão
    req.session.user = req.user;
    return this.authService.googleLogin(req);
  }

  @Get('profile')
  getProfile(@Req() req) {
    // Retorna os dados do usuário armazenados na sessão
    if(req.session.user) {
      return req.session.user;
    }

    return 'Nenhuma sessão encontrada';
  }

  @Post('logout')
  logout(@Req() req) {
    // Destroy a sessão
    req.session.destroy((err) => {
      if (err) {
        return "Erro ao fazer o logout"
      }
      return "Logout feito com sucesso";
    });
  }
}
