import { GraphQLContext } from "../types/context";

export const roleGuard = (context: GraphQLContext, allowedRoles: string[]) => {
  if (!context.user) {
    throw new Error("User not authenticated");
  }

  if (!allowedRoles.includes(context.user.role)) {
    throw new Error("Access denied: insufficient permissions");
  }
};
