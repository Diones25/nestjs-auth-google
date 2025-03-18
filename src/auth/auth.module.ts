import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'google' })],
  providers: [GoogleStrategy, AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
