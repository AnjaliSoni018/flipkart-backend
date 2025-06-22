// import  User from "../../../models/User";
import jwt from "jsonwebtoken";
import db from "../../../models";
import { generateOTP, setOTP, validateOTP } from "./auth.utils";
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

      const otp = generateOTP();
      setOTP(phone, otp);

      console.log(`OTP sent to ${phone}: ${otp}`);

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

  async verifyOTP(phone: string, otp: number) {
    const isValid = validateOTP(phone, otp);
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
};
