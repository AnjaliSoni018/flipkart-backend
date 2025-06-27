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
  },
};
