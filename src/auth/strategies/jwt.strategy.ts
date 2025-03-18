import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrai o token do cabeçalho
      ignoreExpiration: false,
      secretOrKey: 'your-secret-key', // Mesma chave usada no JwtModule
    });
  }

  async validate(payload: any) {
    // Valida o payload do token
    return { email: payload.email, sub: payload.sub };
  }
}