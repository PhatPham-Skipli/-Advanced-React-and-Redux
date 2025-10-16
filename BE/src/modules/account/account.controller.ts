import {
    Controller,
    Get,
    Req,
    Query,
    UseGuards,
    Body,
    Put,
    Param
} from '@nestjs/common';
import { AccountService } from './account.service';
import {
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiQuery
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { AccountRole } from '@/enums';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('account')
@ApiBearerAuth()
@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get current user profile' })
    @ApiResponse({ status: 200, description: 'Return current user info' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async getProfile(@Req() req) {
        return await this.accountService.getAccountById(req.user.id);
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AccountRole.ADMIN)
    @ApiOperation({ summary: 'Get paginated list of accounts (admin only)' })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
    @ApiQuery({ name: 'search', required: false, type: String })
    @ApiQuery({ name: 'order', required: false, enum: ['ASC', 'DESC'], example: 'DESC' })
    @ApiQuery({ name: 'isActive', required: false, type: Boolean, example: true })
    @ApiResponse({ status: 200, description: 'Return paginated accounts' })
    async getAccounts(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('search') search?: string,
        @Query('order') order: 'ASC' | 'DESC' = 'DESC',
        @Query('isActive') isActive?: boolean
    ) {
        return await this.accountService.getAllAccounts(
            Number(page),
            Number(limit),
            search,
            order,
            isActive !== undefined ? isActive : undefined
        );
    }

    @Put('change-password')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Change user password' })
    @ApiResponse({ status: 200, description: 'Password changed successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async changePassword(
        @Req() req,
        @Body() changePasswordDto: ChangePasswordDto
    ) {
        return await this.accountService.changePassword(
            req.user.id,
            changePasswordDto
        );
    }

    @Put('soft-delete/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AccountRole.ADMIN)
    @ApiOperation({ summary: 'Soft delete account (admin only)' })
    @ApiResponse({ status: 200, description: 'Account deactivated successfully' })
    async softDeleteAccount(@Param('id') id: string) {
        return await this.accountService.softDeleteAccount(id);
    }

    @Put('restore/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AccountRole.ADMIN)
    @ApiOperation({ summary: 'Restore account (admin only)' })
    @ApiResponse({ status: 200, description: 'Account reactivated successfully' })
    async restoreAccount(@Param('id') id: string) {
        return await this.accountService.restoreAccount(id);
    }
}