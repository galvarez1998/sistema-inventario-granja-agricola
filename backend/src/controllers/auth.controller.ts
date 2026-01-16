import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const repo = AppDataSource.getRepository(User);
      const { username, password, role } = req.body;
      const exists = await repo.findOneBy({ username });
      if (exists) return res.status(400).json({ message: "Usuario ya existe" });
      const hash = await bcrypt.hash(password, 10);
      const user = repo.create({ username, password: hash, role: role || "worker" });
      await repo.save(user);
      res.status(201).json({ id: user.id, username: user.username });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const repo = AppDataSource.getRepository(User);
      const { username, password } = req.body;
      const user = await repo.findOneBy({ username });
      if (!user) return res.status(401).json({ message: "Credenciales inválidas" });
      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.status(401).json({ message: "Credenciales inválidas" });
      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET || "secret", { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}

export default AuthController;