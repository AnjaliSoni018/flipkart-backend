import jwt from "jsonwebtoken";
import db from "../../../models";
import { sendOTP, verifyOTP } from "../../../utils/sendOtp";
import { comparePassword, hashPassword } from "../../../utils/hashPassword";
import { Op } from "sequelize";

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
  async changePassword({
    userId,
    oldPassword,
    newPassword,
  }: {
    userId: string;
    oldPassword: string;
    newPassword: string;
  }) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");

    if (!user.password) {
  throw new Error('User password not set');
}
    const isValid = await comparePassword(oldPassword, user.password);
    if (!isValid) throw new Error("Incorrect current password");

    user.password = await hashPassword(newPassword);
    await user.save();

    return {
      success: true,
      message: "Password changed successfully",
    };
  },
  async searchProductsAsAdmin({
  search,
  status,
  isActive,
  categoryId,
  sellerId,
  limit,
  offset,
}: {
  search?: string;
  status?: string;
  isActive?: boolean;
  categoryId?: number;
  sellerId?: number;
  limit: number;
  offset: number;
}) {
  const whereClause: any = {};

  if (search) {
    whereClause[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { description: { [Op.like]: `%${search}%` } },
    ];
  }

  if (status) {
    whereClause.status = status.toUpperCase();
  }

  if (isActive !== undefined) {
    whereClause.isActive = isActive;
  }

  if (categoryId) {
    whereClause.categoryId = categoryId;
  }

  if (sellerId) {
    whereClause.sellerId = sellerId;
  }

  const { count, rows } = await db.Product.findAndCountAll({
    where: whereClause,
    limit,
    offset,
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: db.ProductImage,
        as: "images",
      },
      {
        model: db.User,
        as: "seller",
        attributes: ["id", "name", "email"],
      },
    ],
  });

  return {
    success: true,
    message: "Products searched and filtered successfully",
    products: rows,
    total: count,
  };
}
};
