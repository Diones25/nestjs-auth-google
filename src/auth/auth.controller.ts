import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('protected')
  @UseGuards(AuthGuard('jwt')) // Protege a rota com JWT
  getProtectedRoute(@Req() req) {
    return {
      message: 'You have accessed a protected route',
      user: req.user, // Dados do usuário extraídos do token JWT
    };
  }
  
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    // Armazena os dados do usuário na sessão
    req.session.user = req.user;

    const result = await this.authService.googleLogin(req);

    // Redireciona para a página de perfil com o token JWT
    res.redirect(`/auth/profile?token=${result.token}`);
  }

  @Get('profile')
  getProfile(@Req() req, @Res() res: Response) {
    const token = req.query.token;

    if (!token) {
      return res.redirect('/auth/google');
    }

    // Verifica se o usuário está autenticado
    if(!req.session.user) {
      return res.redirect('/auth/google'); // Redireciona para a página de login se não estiver autenticado	
    }

    // Renderiza a página EJS com os dados do usuário
    res.render('pages/profile', { token, user: req.session.user });
  }

  @Get('logout')
  logout(@Req() req, @Res() res: Response) {
    // Destroy a sessão
    req.session.destroy((err) => {
      if (err) {
        return res.send('Erro ao fazer o logout');
      }
      res.redirect('/'); // Redireciona para a página inicial após o logout
    });
  }
}
