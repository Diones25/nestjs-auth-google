import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }
  
  async generateJwtToken(user: any): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async googleLogin(req) {
    if (!req.user) {
      return 'Nenhum usuário do Google'
    }

    // Gera o Token JWT
    const token = await this.generateJwtToken(req.user);

    return {
      message: 'Informações do usuário do Google',
      user: req.user,
      token
    }
  }
}
