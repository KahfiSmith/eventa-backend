import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to handle 404 Not Found errors
 */
const notFoundHandler = (req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    message: `Not Found - ${req.originalUrl}`,
  });
};

export default notFoundHandler;
