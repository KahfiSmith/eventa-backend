import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth';

const router: Router = Router();

// Public routes (no authentication required)
router.get('/', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.get('/:id', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

// Admin only routes
router.use(authenticate);
router.use(authorize('ADMIN'));

router.post('/', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.put('/:id', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.delete('/:id', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

export default router;