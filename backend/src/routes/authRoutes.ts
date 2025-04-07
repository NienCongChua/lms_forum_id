import { Router } from 'express';
import {
  register,
  login,
  forgotPasswordHandler,
  resetPasswordHandler,
  verifyEmailHandler,
  resendVerificationCodeHandler,
  verifyResetCodeHandler
} from '../controllers/authController';

const router = Router();

// User registration
router.post('/register', (req, res) => {
  register(req, res);
});

// User login
router.post('/login', (req, res) => {
  login(req, res);
});

// Forgot password
router.post('/forgot-password', (req, res) => {
  forgotPasswordHandler(req, res);
});

// Verify reset code
router.post('/verify-reset-code', (req, res) => {
  verifyResetCodeHandler(req, res);
});

// Reset password
router.post('/reset-password', (req, res) => {
  resetPasswordHandler(req, res);
});

// Email verification
router.post('/verify-email', (req, res) => {
  verifyEmailHandler(req, res);
});

// Resend verification code
router.post('/resend-verification', (req, res) => {
  resendVerificationCodeHandler(req, res);
});

export default router;
