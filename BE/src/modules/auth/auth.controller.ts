import {
    Controller,
    Post,
    Body,
    UseGuards,
    Request,
    HttpCode
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AccountService } from '../account/account.service';
import { CreateAccountDto } from '../account/dto/create-account.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly accountService: AccountService
    ) {}

    @Post('register')
    @ApiOperation({ summary: 'Register a new account' })
    @ApiBody({ type: CreateAccountDto })
    @ApiResponse({ status: 201, description: 'Account created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async register(@Body() createAccountDto: CreateAccountDto) {
        return this.accountService.createAccount(createAccountDto);
    }

    @Post('login')
    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    @ApiOperation({ summary: 'Login with username/email and password' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({
        status: 200,
        description: 'Login successful, returns JWT access token.'
    })
    @ApiResponse({ status: 401, description: 'Invalid credentials.' })
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
