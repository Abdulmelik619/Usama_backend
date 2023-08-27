import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { StudentService } from 'src/student/student.service';
import { StudentModule } from 'src/student/student.module';
import { UsatzModule } from 'src/usatz/usatz.module';
import { UsatzService } from 'src/usatz/usatz.service';

@Module({
    imports: [
        UsatzModule,
        StudentModule,
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
        
    ],
    exports: [AuthService],
  providers: [  AuthService, LocalStrategy, JwtStrategy, ConfigService,],
  controllers: [AuthController]
})
export class AuthModule {}
