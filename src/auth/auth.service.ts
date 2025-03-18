import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

  googleLogin(req) {
    if (!req.user) {
      return 'Nenhum usuário do Google'
    }

    return {
      message: 'Informações do usuário do Google',
      user: req.user
    }
  }
}
