import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const isHttpException = exception instanceof HttpException;

    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionRes = isHttpException ? exception.getResponse() : null;

    let message = 'Internal server error';
    let error: Record<string, any> = {};
    let details: Record<string, any> | null = null;
    let errors: string[] = [];

    if (typeof exceptionRes === 'object' && exceptionRes !== null) {
      const responseObj = exceptionRes as Record<string, any>;

      message = responseObj.message ?? 'Internal server error';
      details = responseObj.details ?? null;
      errors = responseObj.errors ?? [];

      if ('error' in responseObj) {
        error = responseObj.error;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    res.status(status).json({
      statusCode: status,
      message,
      details: details || undefined,
      errors: errors.length ? errors : undefined,
      error: Object.keys(error).length ? error : undefined,
    });
  }
}
