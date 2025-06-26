import db from "../../../models";
const { User, Category } = db;

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
  async createCategory(name: string, parentId?: number) {
    if (parentId) {
      const parent = await Category.findByPk(parentId);
      if (!parent) throw new Error("Parent category not found");
    }

    const category = await Category.create({ name, parentId });

    return {
      success: true,
      message: "Category created successfully",
      category,
    };
  },
};
