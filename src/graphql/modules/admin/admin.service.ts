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
  async getAllCategories() {
    const categories = await Category.findAll({
      order: [["createdAt", "DESC"]],
    });
    return categories;
  },
  async updateCategory({
    categoryId,
    name,
    parentId,
  }: {
    categoryId: number;
    name?: string;
    parentId?: number;
  }) {
    const category = await Category.findByPk(categoryId);
    if (!category) throw new Error("Category not found");

    if (name !== undefined) category.name = name;
    if (parentId !== undefined) category.parentId = parentId;

    await category.save();

    return {
      success: true,
      message: "Category updated successfully",
      category,
    };
  },

  async deleteCategory(categoryId: number) {
    const category = await Category.findByPk(categoryId);
    if (!category) throw new Error("Category not found");

    await category.destroy();

    return {
      success: true,
      message: "Category deleted successfully",
      category: null,
    };
  },
};
