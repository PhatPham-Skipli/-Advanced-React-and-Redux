import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { Account } from './account.entity';

@Entity({ name: 'comments' })
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'text' })
    content!: string;

    @ManyToOne(() => Account, (account) => account.authoredComments, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    author!: Account;

    @ManyToOne(() => Account, (account) => account.receivedComments, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    target!: Account;

    @Column({ default: true })
    isActive!: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;
}

export default Comment;
