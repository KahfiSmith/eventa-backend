import { Router } from 'express';

const router: Router = Router();

// Public routes (no authentication required)
router.get('/search', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.get('/geocode', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.get('/reverse-geocode', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.get('/cities', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.get('/nearby-events', (_req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

export default router;