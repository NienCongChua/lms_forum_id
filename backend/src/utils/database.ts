import mysql from 'mysql2/promise';
import pool from '../config/db';

type User = {
  id: number;
  email: string;
  password: string;
  // Add other user fields as needed
};

export async function createConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to MySQL database');
    return connection;
  } catch (error) {
    console.error('Error connecting to MySQL database:', error);
    throw error;
  }
}


export async function queryUsers(connection: mysql.Connection, email: string): Promise<User[]> {
  const [rows] = await connection.execute<mysql.RowDataPacket[]>(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows as User[];
}

export async function testConnection() {
  const connection = await createConnection();
  await connection.release();
}
