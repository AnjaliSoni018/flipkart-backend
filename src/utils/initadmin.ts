import db from "../models";
import bcrypt from "bcrypt";

const { User } = db;

export const initAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ where: { role: "ADMIN" } });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
      name: "Super Admin",
      phone: "9999999999",
      email: "admin@flipkart.com",
      password: hashedPassword,
      role: "ADMIN",
      isVerified: true,
      isApproved: true,
    });

    console.log("Admin created successfully");
  } catch (error) {
    console.error("Error creating Admin:", error);
  }
};
