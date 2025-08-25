import './register-paths';
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import 'express-async-errors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
// Import middleware
import errorHandler from './middleware/errorHandler';
import notFoundHandler from './middleware/notFound';

// Import routes
import authRoutes from './routes/auth';
import usersRoutes from './routes/users';
import eventsRoutes from './routes/events';
import categoriesRoutes from './routes/categories';
import venuesRoutes from './routes/venues';
import ticketsRoutes from './routes/tickets';
import paymentsRoutes from './routes/payments';
import locationsRoutes from './routes/locations';
import notificationsRoutes from './routes/notifications';

// Create Express application
const app: Express = express();

// Apply middleware
app.use(helmet());
app.use(cors());
app.use(compression() as any);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (process.env['NODE_ENV'] !== 'test') {
  app.use(morgan('dev'));
}

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/events', eventsRoutes);
app.use('/api/v1/categories', categoriesRoutes);
app.use('/api/v1/venues', venuesRoutes);
app.use('/api/v1/tickets', ticketsRoutes);
app.use('/api/v1/payments', paymentsRoutes);
app.use('/api/v1/locations', locationsRoutes);
app.use('/api/v1/notifications', notificationsRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

export default app;