import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    // Armazena os dados do usuário na sessão
    req.session.user = req.user;

    // Redireciona para a página de perfil
    res.redirect('/auth/profile');
  }

  @Get('profile')
  getProfile(@Req() req, @Res() res: Response) {
    // Verifica se o usuário está autenticado
    if(!req.session.user) {
      return res.redirect('/auth/google'); // Redireciona para a página de login se não estiver autenticado	
    }

    // Renderiza a página EJS com os dados do usuário
    res.render('pages/profile', { user: req.session.user });
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
