import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth';

const router: Router = Router();

// Apply authentication middleware to all user routes
router.use(authenticate);

// Public routes (for authenticated users)
router.get('/me', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.put('/me', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.patch('/me/password', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.post('/me/avatar', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

// Admin only routes
router.get('/', authorize('ADMIN'), (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.get('/:id', authorize('ADMIN'), (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.put('/:id', authorize('ADMIN'), (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.delete('/:id', authorize('ADMIN'), (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

export default router;