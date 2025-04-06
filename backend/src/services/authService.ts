import { promisify } from 'util';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import db from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
const tokenExpiry = '30d';

// Database pool from your existing config
export const pool = db;

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-email-password'
  }
});

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
  
  // Create user
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO Users (Email, PasswordHash, FirstName, LastName, Role) VALUES (?, ?, ?, ?, ?)',
    [email, hashedPassword, firstName, lastName, role]
  );

  // Generate verification token
  const verificationToken = jwt.sign(
    { email, userId: result.insertId },
    jwtSecret,
    { expiresIn: '1d' }
  );

  // Send verification email
  // const verificationUrl = `http://localhost:8080/verify-email?token=${verificationToken}`;
  
  // await transporter.sendMail({
  //   from: 'your-email@gmail.com',
  //   to: email,
  //   subject: 'Verify your email',
  //   html: `Please click <a href="${verificationUrl}">here</a> to verify your email.`
  // });

  return { 
    message: 'Registration successful. Please check your email for verification.',
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
  
  // Generate reset token
  const resetToken = jwt.sign(
    { email: user.Email, userId: user.UserID },
    jwtSecret,
    { expiresIn: '1h' }
  );

  // Save reset token to database
  await pool.query<ResultSetHeader>(
    'UPDATE Users SET ResetToken = ? WHERE UserID = ?',
    [resetToken, user.UserID]
  );

  // Send reset email
  const resetUrl = `http://localhost:8080/reset-password?token=${resetToken}`;
  
  await transporter.sendMail({
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Password Reset',
    html: `Please click <a href="${resetUrl}">here</a> to reset your password.`
  });
}

export async function resetPassword(token: string, newPassword: string) {
  try {
    // Verify token
    const decoded = jwt.verify(token, jwtSecret) as { email: string, userId: number };
    
    // Find user
    const [users] = await pool.query<User[]>(
      'SELECT * FROM Users WHERE UserID = ? AND ResetToken = ?',
      [decoded.userId, token]
    );

    if (users.length === 0) {
      throw new Error('Invalid or expired token');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    
    // Update password and clear reset token
    await pool.query<ResultSetHeader>(
      'UPDATE Users SET PasswordHash = ?, ResetToken = NULL WHERE UserID = ?',
      [hashedPassword, decoded.userId]
    );
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

export async function verifyEmail(token: string) {
  try {
    // Verify token
    const decoded = jwt.verify(token, jwtSecret) as { email: string, userId: number };
    
    // Update user status
    await pool.query<ResultSetHeader>(
      'UPDATE Users SET Status = "active" WHERE UserID = ?',
      [decoded.userId]
    );
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

export class AuthService {
  static async createAccount(user: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: string;
  }): Promise<{ success: boolean }> {
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
    
    // Create user
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO Users (Email, PasswordHash, FirstName, LastName, Role) VALUES (?, ?, ?, ?, ?)',
      [user.email, hashedPassword, user.firstName, user.lastName, user.role || 'student']
    );

    // Generate verification token
    const verificationToken = jwt.sign(
      { email: user.email, userId: result.insertId },
      jwtSecret,
      { expiresIn: '1d' }
    );

    // Send verification email
    const verificationUrl = `http://localhost:8080/verify-email?token=${verificationToken}`;
    
    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to: user.email,
      subject: 'Verify your email',
      html: `Please click <a href="${verificationUrl}">here</a> to verify your email.`
    });

    return { success: true };
  }
}
