/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from '../interface';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionFilter.name);
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status: number;
        let message: string;
        let error: any;

        if (exception instanceof HttpException) {
            // Expected errors (known HTTP errors)
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();

            if (typeof exceptionResponse === 'string') {
                message = exceptionResponse;
            } else if (
                typeof exceptionResponse === 'object' && exceptionResponse !== null
            ) {
                const exceptionResponseObj = exceptionResponse as Record<
                    string,
                    any
                >;
                message =
                    exceptionResponseObj.message ||
                    exceptionResponseObj.error ||
                    'Unknown error';

                // DTO validation error
                if (Array.isArray(exceptionResponseObj.message)) {
                    message = 'Invalid data';
                    error = exceptionResponseObj.message;
                }
            } else {
                message = 'Unknown error';
            }
        } else {
            // Unexpected errors (system errors)
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'System error, please try again later';
            this.logger.error(exception);
        }

        const errorResponse: ApiResponse<any> = {
            success: false,
            message,
            ...(error && { error })
        };

        response.status(status).json(errorResponse);
    }
}