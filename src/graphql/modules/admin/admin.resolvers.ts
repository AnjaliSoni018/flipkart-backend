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
  },
};
