import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    JwtModule.register({
      secret: "89bc3cf38c298a53667c80031696b3520cc278a2",
      signOptions: { expiresIn: '1d' }
    })
  ],
  providers: [GoogleStrategy, JwtStrategy, AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
