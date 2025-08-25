import './register-paths';
import app from './app';
import { prisma } from './lib/prisma';
import { createLogger } from './utils/logger';

const logger = createLogger('server');
const PORT = process.env['PORT'] || 3000;

async function startServer() {
  try {
    // Test database connection
    await prisma.$connect();
    logger.info('Database connection established');

    // Start the server
    const server = app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`Environment: ${process.env['NODE_ENV'] || 'development'}`);
      logger.info(`http://localhost:${PORT}`);
    });

    // Handle graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      logger.info(`${signal} received. Shutting down gracefully...`);
      
      server.close(async () => {
        logger.info('HTTP server closed');
        
        try {
          await prisma.$disconnect();
          logger.info('Database connection closed');
          process.exit(0);
        } catch (err) {
          logger.error('Error during database disconnection:', err);
          process.exit(1);
        }
      });
      
      // Force shutdown after 10s if graceful shutdown fails
      setTimeout(() => {
        logger.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };

    // Listen for termination signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    return server;
  } catch (error) {
    logger.error('Failed to start server:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

// Start the server if this file is run directly
if (require.main === module) {
  startServer();
}

export default startServer;