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
      secretOrKey: '89bc3cf38c298a53667c80031696b3520cc278a2', // Mesma chave usada no JwtModule
    });
  }

  async validate(payload: any) {
    // Valida o payload do token
    return { email: payload.email, sub: payload.sub };
  }
}