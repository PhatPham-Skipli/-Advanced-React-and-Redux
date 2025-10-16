import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Comment } from '@/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Account])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
