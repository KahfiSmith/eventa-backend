import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const config = {
  // Server configuration
  server: {
    port: process.env['PORT'] || 3000,
    nodeEnv: process.env['NODE_ENV'] || 'development',
    apiPrefix: '/api/v1',
    corsOrigin: process.env['CORS_ORIGIN'] || '*',
  },
  
  // Database configuration
  database: {
    url: process.env['DATABASE_URL'] || 'postgresql://postgres:postgres@localhost:5432/eventa',
  },
  
  // JWT configuration
  jwt: {
    secret: process.env['JWT_SECRET'] || 'your-secret-key',
    accessExpiresIn: process.env['JWT_ACCESS_EXPIRES_IN'] || '15m',
    refreshExpiresIn: process.env['JWT_REFRESH_EXPIRES_IN'] || '7d',
  },
  
  // Redis configuration
  redis: {
    url: process.env['REDIS_URL'] || 'redis://localhost:6379',
  },
  
  // Email configuration
  email: {
    host: process.env['EMAIL_HOST'] || 'smtp.example.com',
    port: parseInt(process.env['EMAIL_PORT'] || '587', 10),
    user: process.env['EMAIL_USER'] || 'user@example.com',
    password: process.env['EMAIL_PASSWORD'] || 'password',
    from: process.env['EMAIL_FROM'] || 'Eventa <noreply@eventa.com>',
  },
  
  // Payment gateway configuration (Midtrans)
  payment: {
    midtrans: {
      clientKey: process.env['MIDTRANS_CLIENT_KEY'] || '',
      serverKey: process.env['MIDTRANS_SERVER_KEY'] || '',
      isProduction: process.env['MIDTRANS_IS_PRODUCTION'] === 'true',
    },
  },
  
  // Google Maps API configuration
  maps: {
    apiKey: process.env['GOOGLE_MAPS_API_KEY'] || '',
  },
  
  // File upload configuration
  upload: {
    maxSize: parseInt(process.env['UPLOAD_MAX_SIZE'] || '5242880', 10), // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    profilesDir: process.env['UPLOAD_PROFILES_DIR'] || 'uploads/profiles',
    eventsDir: process.env['UPLOAD_EVENTS_DIR'] || 'uploads/events',
    documentsDir: process.env['UPLOAD_DOCUMENTS_DIR'] || 'uploads/documents',
  },
};

export default config;
