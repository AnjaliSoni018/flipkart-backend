import db from "../../../models";
const { User } = db;

export const adminService = {
  async getPendingSellers() {
    return await User.findAll({
      where: {
        role: "SELLER",
        isApproved: false,
      },
    });
  },

  async approveSeller(userId: string) {
    const user = await User.findByPk(userId);

    if (!user || user.role !== "SELLER") {
      throw new Error("User is not a pending seller");
    }

    user.isApproved = true;
    await user.save();

    return {
      success: true,
      message: `Seller with ID ${userId} approved.`,
    };
  },
};
