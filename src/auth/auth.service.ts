import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }
  
  async generateJwtToken(user: any): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

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
