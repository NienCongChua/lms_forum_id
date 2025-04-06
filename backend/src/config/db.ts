import { createPool } from 'mysql2/promise';

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'lms_forum_id',
  port: 3306,
});

export default pool;
