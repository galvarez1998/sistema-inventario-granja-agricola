import "reflect-metadata";
import { AppDataSource } from "../data-source";
import { User } from "../models/User";
import bcrypt from "bcrypt";

async function seedAdmin() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");

    const userRepo = AppDataSource.getRepository(User);
    
    // Check if admin already exists
    const existingAdmin = await userRepo.findOneBy({ username: "admin" });
    if (existingAdmin) {
      console.log("Admin user already exists");
      await AppDataSource.destroy();
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = userRepo.create({
      username: "admin",
      password: hashedPassword,
      role: "admin",
    });

    await userRepo.save(admin);
    console.log("Admin user created successfully");
    console.log("Username: admin");
    console.log("Password: admin123");
    console.log("Please change the password after first login!");

    await AppDataSource.destroy();
  } catch (error) {
    console.error("Error seeding admin user:", error);
    process.exit(1);
  }
}

seedAdmin();
