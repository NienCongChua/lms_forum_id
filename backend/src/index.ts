// import { createConnection } from 'typeorm';
// import express from 'express';

// const app = express();
// const port = 3000;

// // Khởi động TypeORM
// createConnection().then(async (connection) => {
//   console.log('Database connection established');

//   // Định nghĩa một route để kiểm tra
//   app.get('/api/users', async (req, res) => {
//     const userRepository = connection.getRepository(User);
//     const users = await userRepository.find();
//     res.json(users);
//   });

//   app.listen(port, () => {
//     console.log(`Backend server is running on http://localhost:${port}`);
//   });
// }).catch((error) => console.log('TypeORM connection error: ', error));