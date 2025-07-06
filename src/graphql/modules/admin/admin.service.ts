import { Op } from "sequelize";
import db from "../../../models";
import { hashPassword } from "../../../utils/hashPassword";
const { User, Category, Product } = db;

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

  async rejectSeller(userId: string) {
    const user = await User.findByPk(userId);

    if (!user || user.role !== "SELLER" || user.isApproved) {
      throw new Error("User is not a pending seller");
    }

    await user.destroy();

    return {
      success: true,
      message: `Seller with ID ${userId} rejected and removed.`,
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

  async getPendingProducts(limit = 10, offset = 0) {
    const { count, rows } = await Product.findAndCountAll({
      where: { status: "PENDING" },
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: [{ model: db.ProductImage, as: "images" }],
    });

    return {
      success: true,
      message: "Pending products fetched successfully",
      products: rows,
      total: count,
    };
  },

  async approveProduct(productId: number) {
    const product = await Product.findByPk(productId);
    if (!product) throw new Error("Product not found");
    if (product.status !== "pending") throw new Error("Product is not pending approval");

    product.status = "approved";
    product.isActive = true;
    await product.save();

    return {
      success: true,
      message: "Product approved successfully",
    };
  },

  async rejectProduct(productId: number) {
    const product = await Product.findByPk(productId);
    if (!product) throw new Error("Product not found");
    if (product.status !== "pending") throw new Error("Product is not pending approval");

    product.status = "rejected";
    product.isActive = false;
    await product.save();

    return {
      success: true,
      message: "Product rejected successfully",
    };
  },
  async getUsersByRoles(roles: string[]) {
  return await User.findAll({
    where: {
      role: roles,
    },
  });
},
 async getAdminProfile(adminId: number) {
    const admin = await db.User.findByPk(adminId);
    if (!admin || admin.role !== "ADMIN") {
      throw new Error("Admin not found or unauthorized");
    }

    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    };
  },

  async updateAdminProfile(
    adminId: number,
    input: { name?: string; email?: string; password?: string }
  ) {
    const admin = await db.User.findByPk(adminId);
    if (!admin || admin.role !== "ADMIN") {
      throw new Error("Admin not found or unauthorized");
    }

    if (input.name) admin.name = input.name;
    if (input.email) admin.email = input.email;
    if (input.password) {
      admin.password = await hashPassword(input.password); 
    }

    await admin.save();

    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    };
  },
  async searchUsers({
  search = "",
  role,
  limit = 10,
  offset = 0,
}: {
  search?: string;
  role?: string;
  limit?: number;
  offset?: number;
}) {
  const where: any = {
    [Op.or]: [
      { name: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } },
    ],
  };

  if (role) {
    where.role = role;
  }

  const { count, rows } = await User.findAndCountAll({
    where,
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });

  return {
    success: true,
    message: "Users fetched successfully",
    users: rows,
    total: count,
  };
},
async toggleUserActiveStatus(userId: string, makeActive: boolean) {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role === "ADMIN") {
    throw new Error("Cannot block or unblock an admin.");
  }

  user.isActive = makeActive;
  await user.save();

  return {
    success: true,
    message: `User has been ${makeActive ? "unblocked" : "blocked"} successfully.`,
    user,
  };
},
async getAllProductsAsAdmin(
  limit = 10,
  offset = 0,
  status?: string,
  categoryId?: number
) {
  const whereClause: any = {};

  if (status) {
    whereClause.status = status.toUpperCase();
  }

  if (categoryId) {
    whereClause.categoryId = categoryId;
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
    message: "All products fetched successfully",
    products: rows,
    total: count,
  };
}

};
