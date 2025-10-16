import {
    Controller,
    Get,
    Query,
    UseGuards,
    Req,
    Put,
    Param,
    Body,
    Post
} from '@nestjs/common';
import { CommentService } from './comment.service';
import {
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiQuery
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { AccountRole } from '@/enums';

@ApiTags('comment')
@ApiBearerAuth()
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AccountRole.ADMIN)
    @ApiOperation({ summary: 'Get all comments (admin only)' })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
    @ApiQuery({ name: 'search', required: false, type: String })
    @ApiQuery({
        name: 'order',
        required: false,
        enum: ['ASC', 'DESC'],
        example: 'DESC'
    })
    @ApiQuery({ name: 'isActive', required: false, type: Boolean })
    @ApiResponse({ status: 200, description: 'Return paginated comments' })
    async getAllComments(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('search') search?: string,
        @Query('order') order: 'ASC' | 'DESC' = 'DESC',
        @Query('isActive') isActive?: boolean
    ) {
        return await this.commentService.getAllComments(
            Number(page),
            Number(limit),
            search,
            order,
            isActive !== undefined ? isActive : undefined
        );
    }

    @Post(':userId')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AccountRole.ADMIN)
    @ApiOperation({ summary: 'Admin create comment for user' })
    @ApiResponse({ status: 200, description: 'Comment created successfully' })
    async createComment(
        @Req() req,
        @Param('userId') userId: string,
        @Body('content') content: string
    ) {
        return this.commentService.createCommentByAdmin(
            req.user.id,
            userId,
            content
        );
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get all comments for current user' })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
    @ApiQuery({ name: 'search', required: false, type: String })
    @ApiQuery({
        name: 'order',
        required: false,
        enum: ['ASC', 'DESC'],
        example: 'DESC'
    })
    @ApiQuery({ name: 'isActive', required: false, type: Boolean })
    @ApiResponse({
        status: 200,
        description: 'Return paginated comments for user'
    })
    async getMyComments(
        @Req() req,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('search') search?: string,
        @Query('order') order: 'ASC' | 'DESC' = 'DESC',
        @Query('isActive') isActive?: boolean
    ) {
        return await this.commentService.getAllCommentsForUser(
            req.user.id,
            Number(page),
            Number(limit),
            search,
            order,
            isActive !== undefined ? isActive : undefined
        );
    }

    @Put('soft-delete/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AccountRole.ADMIN)
    @ApiOperation({ summary: 'Soft delete comment (admin only)' })
    @ApiResponse({ status: 200, description: 'Comment deleted successfully' })
    async softDeleteComment(@Param('id') id: string) {
        return await this.commentService.softDeleteComment(id);
    }

    @Put('restore/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AccountRole.ADMIN)
    @ApiOperation({ summary: 'Restore comment (admin only)' })
    @ApiResponse({ status: 200, description: 'Comment restored successfully' })
    async restoreComment(@Param('id') id: string) {
        return await this.commentService.restoreComment(id);
    }
}
