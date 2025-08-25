import { Router } from 'express';
import { authenticate } from '../../middleware/auth';

const router: Router = Router();

// All notification routes require authentication
router.use(authenticate);

// Routes for all authenticated users
router.get('/', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.patch('/:id/read', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.patch('/read-all', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.delete('/:id', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.delete('/clear-all', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

export default router;