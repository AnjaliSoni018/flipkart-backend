import jwt from "jsonwebtoken";
import db from "../../../models";
import { sendOTP, verifyOTP } from "../../../utils/sendOtp";
import { comparePassword } from "../../../utils/hashPassword";

const { User } = db;

export const authService = {
  async authWithOTP(phone: string) {
    try {
      let user = await User.findOne({ where: { phone } });

      if (!user) {
        user = await User.create({
          phone,
          role: "CUSTOMER",
          isVerified: false,
          isApproved: false,
        });
      }

      await sendOTP(phone);
      console.log(`OTP sent to ${phone}`);

      return {
        success: true,
        message: "OTP sent successfully",
      };
    } catch (error) {
      console.error("authWithOTP error:", error);
      return {
        success: false,
        message: "Failed to send OTP",
      };
    }
  },

  async verifyOTP(phone: string, otp: string) {
    const isValid = await verifyOTP(phone, otp.toString());
    if (!isValid) throw new Error("Invalid or expired OTP");

    const user = await User.findOne({ where: { phone } });
    if (!user) throw new Error("User not found");

    user.isVerified = true;
    await user.save();

    const token = jwt.sign(
      {
        id: user.id,
        phone: user.phone,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return {
      token,
      user,
    };
  },

  async adminLogin(email: string, password: string) {
    const user = await User.findOne({ where: { email, role: "ADMIN" } });
    if (!user) throw new Error("Admin not found");

    if (!user.password) throw new Error("Password not set for the user");
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
