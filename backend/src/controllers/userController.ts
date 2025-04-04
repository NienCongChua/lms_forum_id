import { Request, Response } from "express";
import prisma from "../config/db";

// API lấy danh sách users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.users.findMany(); // Thay 'user' bằng tên bảng trong DB
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// API lấy user theo ID
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.users.findUnique({
      where: { UserID: Number(id) },
    });
    if (!user) return res.status(404).json({ message: "User không tồn tại" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};