import { Account } from '@/entities';
import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Like, Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountRole } from '@/enums';
import * as bcrypt from 'bcryptjs';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
        private readonly datasource: DataSource
    ) {}

    async createAccount(
        createAccountDto: CreateAccountDto
    ): Promise<{ message: string }> {
        try {
            await this.datasource.transaction(async (manager) => {
                const accountRepo = manager.getRepository(Account);

                const existingEmail = await accountRepo.findOne({
                    where: { email: createAccountDto.email.toLowerCase() }
                });
                if (existingEmail) {
                    throw new BadRequestException(
                        'Account with this email already exists'
                    );
                }

                const existingUserName = await accountRepo.findOne({
                    where: { username: createAccountDto.username.toLowerCase() }
                });
                if (existingUserName) {
                    throw new BadRequestException(
                        'Account with this username already exists'
                    );
                }

                const newAccount = {
                    ...createAccountDto,
                    role: AccountRole.USER
                };

                const account = accountRepo.create(newAccount);
                await accountRepo.save(account);
            });
            return { message: 'Account created successfully' };
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new Error('Failed to create account');
        }
    }

    async validateAccount(identifier: string, password: string): Promise<any> {
        try {
            const account = await this.accountRepository.findOne({
                where: [
                    { email: identifier.toLowerCase() },
                    { username: identifier.toLowerCase() }
                ]
            });

            if (!account) {
                throw new BadRequestException('Account not found');
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                account.password
            );
            if (!isPasswordValid) {
                throw new BadRequestException(
                    'Username or password is incorrect'
                );
            }

            const result = {
                id: account.id,
                email: account.email,
                username: account.username,
                role: account.role
            };

            return result;
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new Error('Failed to validate account');
        }
    }

    async getAccountById(
        id: string
    ): Promise<{ account: any; message: string }> {
        try {
            const account = await this.accountRepository.findOne({
                where: { id }
            });

            if (!account) {
                throw new NotFoundException('Account not found');
            }

            const { password, createdAt, updatedAt, isActive, ...result } =
                account;

            return {
                account: result,
                message: 'Account retrieved successfully'
            };
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new Error('Failed to get account');
        }
    }

    async getAllAccounts(
        page: number = 1,
        limit: number = 10,
        search?: string,
        order: 'ASC' | 'DESC' = 'DESC',
        isActive?: boolean
    ): Promise<any> {
        try {
            let where: any = {};
            if (typeof isActive === 'boolean') {
                where.isActive = isActive;
            }

            if (search) {
                where = [
                    { ...where, email: Like(`%${search.toLowerCase()}%`) },
                    { ...where, username: Like(`%${search.toLowerCase()}%`) },
                    { ...where, fullName: Like(`%${search.toLowerCase()}%`) }
                ];
            }

            const [data, total] = await this.accountRepository.findAndCount({
                where,
                order: { createdAt: order },
                skip: (page - 1) * limit,
                take: limit
            });

            const mappedData = data.map((account) => {
                const { password, ...rest } = account;
                return rest;
            });

            return {
                data: mappedData,
                total,
                page,
                limit,
                message: 'Accounts retrieved successfully'
            };
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new Error('Failed to get accounts');
        }
    }

    async changePassword(
        id: string,
        changePasswordDto: ChangePasswordDto
    ): Promise<any> {
        try {
            const account = await this.accountRepository.findOne({
                where: { id }
            });
            if (!account) {
                throw new NotFoundException('Account not found');
            }
            const isCurrentPasswordValid = await bcrypt.compare(
                changePasswordDto.currentPassword,
                account.password
            );
            if (!isCurrentPasswordValid) {
                throw new BadRequestException('Current password is incorrect');
            }

            const isSamePassword = await bcrypt.compare(
                changePasswordDto.newPassword,
                account.password
            );
            if (isSamePassword) {
                throw new BadRequestException(
                    'New password must be different from the current password'
                );
            }

            account.password = changePasswordDto.newPassword;
            await this.accountRepository.save(account);
            return { message: 'Password changed successfully' };
        } catch (error) {
            if (
                error instanceof BadRequestException ||
                error instanceof NotFoundException
            ) {
                throw error;
            }
            throw new Error('Failed to change password');
        }
    }

    async softDeleteAccount(id: string): Promise<any> {
        try {
            const account = await this.accountRepository.findOne({
                where: { id }
            });
            if (!account) {
                throw new NotFoundException('Account not found');
            }
            if (account.isActive === false) {
                throw new BadRequestException('Account is already inactive');
            }

            account.isActive = false;
            await this.accountRepository.save(account);
            return { message: 'Account deactivated successfully' };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new Error('Failed to delete account');
        }
    }

    async restoreAccount(id: string): Promise<any> {
        try {
            const account = await this.accountRepository.findOne({
                where: { id }
            });
            if (!account) {
                throw new NotFoundException('Account not found');
            }
            if (account.isActive === true) {
                throw new BadRequestException('Account is already active');
            }

            account.isActive = true;
            await this.accountRepository.save(account);
            return { message: 'Account reactivated successfully' };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new Error('Failed to restore account');
        }
    }
}
