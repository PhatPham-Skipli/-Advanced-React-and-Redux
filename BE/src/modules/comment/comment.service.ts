import { Account, Comment } from '@/entities';
import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Like, Repository } from 'typeorm';
import { AccountRole } from '@/enums';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
        private readonly datasource: DataSource
    ) {}

    async getAllComments(
        page: number = 1,
        limit: number = 10,
        search?: string,
        order: 'ASC' | 'DESC' = 'DESC',
        isActive?: boolean
    ): Promise<{ data: any[]; total: number; page: number; limit: number }> {
        try {
            const where: any = {};
            if (typeof isActive === 'boolean') {
                where.isActive = isActive;
            }

            if (search) {
                where.content = Like(`%${search}%`);
            }

            const [data, total] = await this.commentRepository.findAndCount({
                where,
                order: { createdAt: order },
                skip: (page - 1) * limit,
                take: limit
            });

            return { data, total, page, limit };
        } catch (error) {
            throw new BadRequestException('Failed to get comments');
        }
    }

    async createCommentByAdmin(
        adminId: string,
        userId: string,
        content: string
    ): Promise<{ message: string }> {
        try {
            await this.datasource.transaction(async (manager) => {
                const accountRepo = manager.getRepository(Account);
                const commentRepo = manager.getRepository(Comment);

                const admin = await accountRepo.findOne({
                    where: { id: adminId }
                });
                if (!admin || admin.role !== AccountRole.ADMIN)
                    throw new ForbiddenException('Only admin can comment');

                const user = await accountRepo.findOne({
                    where: { id: userId }
                });
                if (!user) throw new NotFoundException('Target user not found');

                const comment = commentRepo.create({
                    author: admin,
                    target: user,
                    content
                });
                await commentRepo.save(comment);
            });
            return { message: 'Comment created successfully' };
        } catch (error) {
            throw new BadRequestException('Failed to create comment');
        }
    }

    async getAllCommentsForUser(
        userId: string,
        page: number = 1,
        limit: number = 10,
        search?: string,
        order: 'ASC' | 'DESC' = 'DESC',
        isActive?: boolean
    ): Promise<{ data: any[]; total: number; page: number; limit: number }> {
        try {
            const where: any = { target: { id: userId } }; // target là user
            if (typeof isActive === 'boolean') {
                where.isActive = isActive;
            }

            if (search) {
                where.content = Like(`%${search}%`);
            }

            const [data, total] = await this.commentRepository.findAndCount({
                where,
                order: { createdAt: order },
                skip: (page - 1) * limit,
                take: limit,
                relations: ['author']
            });

            const mappedData = data.map((comment) => {
                const { updatedAt, createdAt, ...rest } = comment;
                return rest;
            });

            return { data: mappedData, total, page, limit };
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new Error('Failed to get comments for user');
        }
    }

    async softDeleteComment(id: string): Promise<{ message: string }> {
        try {
            const comment = await this.commentRepository.findOne({
                where: { id }
            });
            if (!comment) {
                throw new NotFoundException('Comment not found');
            }

            if (comment.isActive === false) {
                throw new BadRequestException('Comment is already inactive');
            }

            comment.isActive = false;
            await this.commentRepository.save(comment);
            return { message: 'Comment deleted successfully' };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException('Failed to soft delete comment');
        }
    }

    async restoreComment(id: string): Promise<{ message: string }> {
        try {
            const comment = await this.commentRepository.findOne({
                where: { id }
            });
            if (!comment) {
                throw new NotFoundException('Comment not found');
            }

            if (comment.isActive === false) {
                throw new BadRequestException('Comment is already active');
            }

            comment.isActive = true;
            await this.commentRepository.save(comment);
            return { message: 'Comment restored successfully' };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException('Failed to restore comment');
        }
    }
}
