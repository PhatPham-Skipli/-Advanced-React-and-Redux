import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    OneToMany,
    BeforeUpdate
} from 'typeorm';
import { AccountRole } from '../enums';
import { Comment } from './comment.entity';
import * as bcrypt from 'bcryptjs';

@Entity({ name: 'accounts' })
export class Account {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    username!: string;

    @Column({ type: 'varchar', length: 255 })
    password!: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    fullName!: string | null;

    @Column({
        type: 'enum',
        enum: AccountRole,
        default: AccountRole.USER
    })
    role!: AccountRole;

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

    @OneToMany(() => Comment, (comment) => comment.author)
    authoredComments!: Comment[];

    @OneToMany(() => Comment, (comment) => comment.target)
    receivedComments!: Comment[];

    @BeforeInsert()
    @BeforeUpdate()
    normalizeEmail() {
        if (this.email) this.email = this.email.toLowerCase();
    }

    @BeforeInsert()
    @BeforeUpdate()
    normalizeUsername() {
        if (this.username) this.username = this.username.toLowerCase();
    }

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
}

export default Account;
