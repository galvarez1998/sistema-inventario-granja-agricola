"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const data_source_1 = require("../data-source");
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function seedAdmin() {
    try {
        await data_source_1.AppDataSource.initialize();
        console.log("Database connected");
        const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
        // Check if admin already exists
        const existingAdmin = await userRepo.findOneBy({ username: "admin" });
        if (existingAdmin) {
            console.log("Admin user already exists");
            await data_source_1.AppDataSource.destroy();
            return;
        }
        // Create admin user
        const hashedPassword = await bcrypt_1.default.hash("admin123", 10);
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
        await data_source_1.AppDataSource.destroy();
    }
    catch (error) {
        console.error("Error seeding admin user:", error);
        process.exit(1);
    }
}
seedAdmin();
