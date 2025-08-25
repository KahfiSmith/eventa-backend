import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { createLogger } from '../utils/logger';
import AppError from '../utils/AppError';

const logger = createLogger('error-handler');

// Define a type for validation error
interface ValidationErrorWithPath {
  path: string;
  msg: string;
}

/**
 * Global error handling middleware
 */
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Log error
  logger.error(`${err.name}: ${err.message}`, {
    path: req.path,
    method: req.method,
    stack: err.stack,
  });

  // Handle AppError (operational errors)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // Handle Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle unique constraint violations
    if (err.code === 'P2002') {
      const field = (err.meta?.['target'] as string[]) || ['record'];
      return res.status(409).json({
        status: 'error',
        message: `A ${field.join(', ')} with this value already exists.`,
      });
    }

    // Handle record not found
    if (err.code === 'P2001' || err.code === 'P2025') {
      return res.status(404).json({
        status: 'error',
        message: 'Record not found.',
      });
    }

    // Handle foreign key constraint failures
    if (err.code === 'P2003') {
      return res.status(400).json({
        status: 'error',
        message: 'Related record not found.',
      });
    }
  }

  // Handle validation errors from express-validator
  if (Array.isArray(err) && err.length > 0 && 'msg' in err[0] && 'path' in err[0]) {
    const validationErrors = err.map((e: ValidationErrorWithPath) => ({
      field: e.path,
      message: e.msg,
    }));

    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: validationErrors,
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token. Please log in again.',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'error',
      message: 'Your token has expired. Please log in again.',
    });
  }

  // Handle multer errors
  if (err.name === 'MulterError') {
    return res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }

  // If in development, send detailed error
  if (process.env['NODE_ENV'] === 'development') {
    return res.status(500).json({
      status: 'error',
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }

  // In production, send generic error
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong on the server.',
  });
};

export default errorHandler;