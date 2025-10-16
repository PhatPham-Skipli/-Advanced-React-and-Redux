import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountModule } from '../account/account.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.stategy';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtStrategy } from './strategies/jwt.stategy';

@Module({
    imports: [
        AccountModule,
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService): JwtModuleOptions => ({
                secret:
                    configService.get<string>('JWT_SECRET') ||
                    'defaultSecretKey',
                signOptions: {
                    expiresIn:
                        (configService.get<string>('JWT_EXPIRES_IN') as any) ||
                        '3600s'
                }
            }),
            global: true
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, LocalAuthGuard, JwtAuthGuard, JwtStrategy]
})
export class AuthModule {}
