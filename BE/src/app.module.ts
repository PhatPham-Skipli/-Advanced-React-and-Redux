import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { AccountModule } from './modules/account/account.module';
import { CommentModule } from './modules/comment/comment.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService): TypeOrmModuleOptions =>
                typeOrmConfig(configService)
        }),
        AuthModule,
        AccountModule,
        CommentModule
    ]
})
export class AppModule {}
