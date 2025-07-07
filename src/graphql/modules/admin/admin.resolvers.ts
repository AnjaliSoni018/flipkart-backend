import { adminService } from "./admin.service";
import { authGuard } from "../../../middlewares/auth.guard";
import { roleGuard } from "../../../middlewares/role.guard";
import { GraphQLContext } from "../../../types/context";

export const adminResolvers = {
  Query: {
    pendingSellers: async (
      _: unknown,
      __: unknown,
      context: GraphQLContext
    ) => {
      authGuard(context);
      roleGuard(context, ["ADMIN"]);
      return adminService.getPendingSellers();
    },
    getAllCategories: async () => {
      return adminService.getAllCategories();
    },
      pendingProducts: async (
      _: unknown,
      { limit, offset }: { limit?: number; offset?: number },
      context: GraphQLContext
    ) => {
      authGuard(context);
      roleGuard(context, ["ADMIN"]);

      return adminService.getPendingProducts(limit, offset);
    },
     usersByRoles: async (
    _: unknown,
    { roles }: { roles: string[] },
    context: GraphQLContext
  ) => {
    authGuard(context);
    roleGuard(context, ["ADMIN"]);

    return adminService.getUsersByRoles(roles);
  },
   adminProfile: async (_: unknown, __: unknown, context: GraphQLContext) => {
      const user = authGuard(context);
      roleGuard(context, ["ADMIN"]);

      const profile = await adminService.getAdminProfile(Number(user.id));

      return {
        success: true,
        message: "Admin profile fetched successfully",
        profile,
      };
    },
    searchUsers: async (
  _: unknown,
  {
    search,
    role,
    limit = 10,
    offset = 0,
  }: { search?: string; role?: string; limit?: number; offset?: number },
  context: GraphQLContext
) => {
  authGuard(context);
  roleGuard(context, ["ADMIN"]);
  return adminService.searchUsers({ search, role, limit, offset });
},
adminGetAllProducts: async (
  _: unknown,
  args: { limit?: number; offset?: number; status?: string; categoryId?: number },
  context: GraphQLContext
) => {
  authGuard(context);
  roleGuard(context, ["ADMIN"]);

  const { limit = 10, offset = 0, status, categoryId } = args;

  return adminService.getAllProductsAsAdmin(limit, offset, status, categoryId);
},
adminSearchProducts: async (
  _: unknown,
  args: {
    search?: string;
    status?: string;
    isActive?: boolean;
    categoryId?: number;
    sellerId?: number;
    limit?: number;
    offset?: number;
  },
  context: GraphQLContext
) => {
  authGuard(context);
  roleGuard(context, ["ADMIN"]);

  const {
    search,
    status,
    isActive,
    categoryId,
    sellerId,
    limit = 10,
    offset = 0,
  } = args;

  return adminService.searchProductsAsAdmin({
    search,
    status,
    isActive,
    categoryId,
    sellerId,
    limit,
    offset,
  });
},
viewAllOrders: async (
  _: unknown,
  { limit = 10, offset = 0, status }: { limit?: number; offset?: number, status?:string },
  context: GraphQLContext
) => {
  authGuard(context);
  roleGuard(context, ["ADMIN"]);

  return adminService.getAllOrders(limit, offset);
},
viewOrderDetails: async (
  _: unknown,
  { orderId }: { orderId: string },
  context: GraphQLContext
) => {
  authGuard(context);
  roleGuard(context, ["ADMIN"]);

  return adminService.getOrderDetails(orderId);
},
  },

  Mutation: {
    approveSeller: async (
      _: unknown,
      { userId }: { userId: string },
      context: GraphQLContext
    ) => {
      authGuard(context);
      roleGuard(context, ["ADMIN"]);
      return adminService.approveSeller(userId);
    },

    rejectSeller: async (
      _: unknown,
      { userId }: { userId: string },
      context: GraphQLContext
    ) => {
      authGuard(context);
      roleGuard(context, ["ADMIN"]);
      return adminService.rejectSeller(userId);
    },

    createCategory: async (
      _: unknown,
      { name, parentId }: { name: string; parentId?: number },
      context: GraphQLContext
    ) => {
      authGuard(context);
      roleGuard(context, ["ADMIN"]);
      return adminService.createCategory(name, parentId);
    },

    updateCategory: async (
      _: unknown,
      args: { categoryId: number; name?: string; parentId?: number },
      context: GraphQLContext
    ) => {
      authGuard(context);
      roleGuard(context, ["ADMIN"]);
      return adminService.updateCategory(args);
    },

    deleteCategory: async (
      _: unknown,
      args: { categoryId: number },
      context: GraphQLContext
    ) => {
      authGuard(context);
      roleGuard(context, ["ADMIN"]);
      return adminService.deleteCategory(args.categoryId);
    },
      approveProduct: async (
      _: unknown,
      { productId }: { productId: number },
      context: GraphQLContext
    ) => {
      authGuard(context);
      roleGuard(context, ["ADMIN"]);

      return adminService.approveProduct(productId);
    },

    rejectProduct: async (
      _: unknown,
      { productId }: { productId: number },
      context: GraphQLContext
    ) => {
      authGuard(context);
      roleGuard(context, ["ADMIN"]);

      return adminService.rejectProduct(productId);
    },
     updateAdminProfile: async (
      _: unknown,
      { input }: { input: { name?: string; email?: string; password?: string } },
      context: GraphQLContext
    ) => {
      const user = authGuard(context);
      roleGuard(context, ["ADMIN"]);

      const profile = await adminService.updateAdminProfile(Number(user.id), input);

      return {
        success: true,
        message: "Admin profile updated successfully",
        profile,
      };
    },
    blockUser: async (
  _: unknown,
  { userId }: { userId: string },
  context: GraphQLContext
) => {
  authGuard(context);
  roleGuard(context, ["ADMIN"]);
  return adminService.toggleUserActiveStatus(userId, false);
},

unblockUser: async (
  _: unknown,
  { userId }: { userId: string },
  context: GraphQLContext
) => {
  authGuard(context);
  roleGuard(context, ["ADMIN"]);
  return adminService.toggleUserActiveStatus(userId, true);
},
activateProduct: async (
  _: unknown,
  { productId }: { productId: string },
  context: GraphQLContext
) => {
  authGuard(context);
  roleGuard(context, ["ADMIN"]);
  return adminService.toggleProductActiveStatus(Number(productId), true);
},

deactivateProduct: async (
  _: unknown,
  { productId }: { productId: string },
  context: GraphQLContext
) => {
  authGuard(context);
  roleGuard(context, ["ADMIN"]);
  return adminService.toggleProductActiveStatus(Number(productId), false);
},
  },
};
