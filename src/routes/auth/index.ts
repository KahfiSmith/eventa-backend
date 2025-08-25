import { Router } from 'express';
import { authLimiter } from '../../middleware/rateLimiter';

const router: Router = Router();

// Apply rate limiting to auth routes
router.use(authLimiter);

// TODO: Implement auth controllers
router.post('/register', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.post('/login', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.post('/refresh-token', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.post('/forgot-password', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.post('/reset-password', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.post('/logout', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.get('/verify-email/:token', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

export default router;