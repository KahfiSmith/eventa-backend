import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth';

const router: Router = Router();

// All payment routes require authentication
router.use(authenticate);

// Routes for all authenticated users
router.get('/my-payments', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.get('/:id', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

// Midtrans notification callback (no auth required)
router.post('/notification/midtrans', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

// Admin only routes
router.get('/', authorize('ADMIN'), (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.post('/:id/refund', authorize('ADMIN'), (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

export default router;