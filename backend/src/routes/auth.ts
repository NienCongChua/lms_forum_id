import { Router } from 'express';
import { AuthService } from '../services/authService';

export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;
    const result = await AuthService.createAccount({ email, password, firstName, lastName, role });
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});
