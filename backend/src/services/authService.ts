import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { sendEmail } from '../utils/emailUtils';
import db from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import dotenv from 'dotenv';
import { generateNumericCode } from '../utils/codeGenerator';
import { getVerificationEmailTemplate, getPasswordResetEmailTemplate } from '../utils/emailTemplates';

dotenv.config();

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET || 'default_jwt_secret_for_development';

if (!process.env.JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET is not set in environment variables. Using default secret for development only.');
}

const tokenExpiry = '30d';

// Database pool from your existing config
export const pool = db;

interface User extends RowDataPacket {
  UserID: number;
  Email: string;
  PasswordHash: string;
  FirstName: string;
  LastName: string;
  Role: string;
  Status: string;
}

export async function registerUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  role = 'student'
) {
  // Check if user exists
  const [existingUsers] = await pool.query<User[]>(
    'SELECT * FROM Users WHERE Email = ?',
    [email]
  );

  if (existingUsers.length > 0) {
    throw new Error('Email already registered');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Generate a random 8-digit verification code
  const verificationCode = generateNumericCode(8);

  // Create user with verification code
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO Users (Email, PasswordHash, FirstName, LastName, Role, VerificationCode) VALUES (?, ?, ?, ?, ?, ?)',
    [email, hashedPassword, firstName, lastName, role, verificationCode]
  );

  // Send verification email with code
  const emailHtml = getVerificationEmailTemplate(firstName, verificationCode);

  await sendEmail(
      email,
      'Verify Your LMS FORUM ID Account',
      emailHtml
  );

  return {
    message: 'Registration successful. Please check your email for the verification code.',
    userId: result.insertId
  };
}

export async function loginUser(email: string, password: string) {
  // Find user
  const [users] = await pool.query<User[]>(
    'SELECT * FROM Users WHERE Email = ?',
    [email]
  );

  if (users.length === 0) {
    throw new Error('Invalid email or password');
  }

  const user = users[0];

  // Check password
  const isValidPassword = await bcrypt.compare(password, user.PasswordHash);
  if (!isValidPassword) {
    throw new Error('Invalid email or password');
  }

  // Check if user is active
  if (user.Status !== 'active') {
    throw new Error('Account is not active');
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      userId: user.UserID,
      email: user.Email,
      role: user.Role
    },
    jwtSecret,
    { expiresIn: tokenExpiry }
  );

  return token;
}

export async function forgotPassword(email: string) {
  // Find user
  const [users] = await pool.query<User[]>(
    'SELECT * FROM Users WHERE Email = ?',
    [email]
  );

  if (users.length === 0) {
    throw new Error('Email not found');
  }

  const user = users[0];

  // Generate reset code (8 digits)
  const resetCode = generateNumericCode(8);

  // Save reset code to database
  await pool.query<ResultSetHeader>(
    'UPDATE Users SET VerificationCode = ? WHERE UserID = ?',
    [resetCode, user.UserID]
  );

  // Send reset email with code
  const emailHtml = getPasswordResetEmailTemplate(user.FirstName, resetCode);

  await sendEmail(
      email,
      'Reset Your LMS FORUM ID Password',
      emailHtml
  );

  return { success: true, message: 'Password reset code sent to your email' };
}

export async function resetPassword(email: string, code: string, newPassword: string) {
  try {
    // Find user with matching email and verification code
    const [users] = await pool.query<User[]>(
      'SELECT * FROM Users WHERE Email = ? AND VerificationCode = ?',
      [email, code]
    );

    if (users.length === 0) {
      throw new Error('Invalid verification code');
    }

    const user = users[0];

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password and clear verification code
    await pool.query<ResultSetHeader>(
      'UPDATE Users SET PasswordHash = ?, VerificationCode = NULL WHERE UserID = ?',
      [hashedPassword, user.UserID]
    );

    // Send confirmation email
    await sendEmail(
        email,
        'Password Reset Successful - LMS FORUM ID',
        `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 5px;">
          <h2 style="color: #3b82f6;">Password Reset Successful</h2>
          <p>Hello ${user.FirstName},</p>
          <p>Your password has been successfully reset. You can now log in with your new password.</p>
          <p>If you did not request this change, please contact our support team immediately.</p>
          <p>Best regards,<br>The LMS FORUM ID Team</p>
        </div>
        `
    );

    return { success: true, message: 'Password has been reset successfully' };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Password reset failed');
  }
}

export async function verifyEmail(email: string, code: string) {
  try {
    // Find user with matching email and verification code
    const [users] = await pool.query<User[]>(
      'SELECT * FROM Users WHERE Email = ? AND VerificationCode = ?',
      [email, code]
    );

    if (users.length === 0) {
      throw new Error('Invalid verification code');
    }

    const user = users[0];

    // Update user status and clear verification code
    await pool.query<ResultSetHeader>(
      'UPDATE Users SET Status = "active", VerificationCode = NULL WHERE UserID = ?',
      [user.UserID]
    );

    return { success: true, message: 'Email verified successfully' };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Verification failed');
  }
}

export async function resendVerificationCode(email: string) {
  try {
    // Find user
    const [users] = await pool.query<User[]>(
      'SELECT * FROM Users WHERE Email = ?',
      [email]
    );

    if (users.length === 0) {
      throw new Error('Email not found');
    }

    const user = users[0];

    // Generate a new verification code
    const verificationCode = generateNumericCode(8);

    // Update the verification code in the database
    await pool.query<ResultSetHeader>(
      'UPDATE Users SET VerificationCode = ? WHERE UserID = ?',
      [verificationCode, user.UserID]
    );

    // Send verification email with the new code
    const emailHtml = getVerificationEmailTemplate(user.FirstName, verificationCode);

    await sendEmail(
        email,
        'Verify Your LMS FORUM ID Account',
        emailHtml
    );

    return { success: true, message: 'Verification code resent to your email' };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to resend verification code');
  }
}

export class AuthService {
  static async createAccount(user: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: string;
  }): Promise<{ success: boolean; message: string }> {
    // Check if user exists
    const [existingUsers] = await pool.query<User[]>(
      'SELECT * FROM Users WHERE Email = ?',
      [user.email]
    );

    if (existingUsers.length > 0) {
      throw new Error('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    // Generate a random 8-digit verification code
    const verificationCode = generateNumericCode(8);

    // Create user with verification code
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO Users (Email, PasswordHash, FirstName, LastName, Role, VerificationCode) VALUES (?, ?, ?, ?, ?, ?)',
      [user.email, hashedPassword, user.firstName, user.lastName, user.role || 'student', verificationCode]
    );

    // Send verification email with code
    const emailHtml = getVerificationEmailTemplate(user.firstName, verificationCode);

    await sendEmail(
        user.email,
        'Verify Your LMS FORUM ID Account',
        emailHtml
    );

    return {
      success: true,
      message: 'Registration successful. Please check your email for the verification code.'
    };
  }
}
