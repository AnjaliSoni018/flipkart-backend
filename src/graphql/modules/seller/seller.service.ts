import db from "../../../models";
import { comparePassword, hashPassword } from "../../../utils/hashPassword";
import jwt from "jsonwebtoken";
const { User } = db;

export const sellerService = {
  async applyForSeller(
    userId: number,
    gstin: string,
    email: string,
    password: string
  ) {
    const user = await User.findByPk(userId);

    if (!user) throw new Error("User not found");
    if (user.role === "SELLER") throw new Error("Already a seller");
    if (user.isApproved) throw new Error("Seller already approved");

    const hashedPassword = await hashPassword(password);

    user.gstin = gstin;
    user.email = email;
    user.password = hashedPassword;
    user.role = "SELLER";
    user.isApproved = false;

    await user.save();

    return {
      success: true,
      message: "Seller application submitted. Await admin approval.",
      user,
    };
  },
  async sellerLogin(email: string, password: string) {
    const user = await User.findOne({ where: { email, role: "SELLER" } });

    if (!user) throw new Error("Seller not found");
    if (!user.isApproved) throw new Error("Seller not yet approved");

    if (!user.password) throw new Error("Password not set for seller");
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { id: user.id, phone: user.phone, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return { token, user };
  },
};
