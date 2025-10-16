import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from '../../account/account.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private accountService: AccountService) {
        super({ usernameField: 'identifier' });
    }

    async validate(identifier: string, password: string): Promise<any> {
       const account = await this.accountService.validateAccount(identifier, password);
       if (!account) {
           throw new UnauthorizedException('Invalid credentials');
       }
       return account;
    }
}