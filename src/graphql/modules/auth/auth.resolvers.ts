import { authGuard } from "../../../middlewares/auth.guard";
import { GraphQLContext } from "../../../types/context";
import { authService } from "./auth.service";

export const authResolvers = {
  Query: {
    _empty: () => "API running",
  },

  Mutation: {
    authWithOTP: async (_: unknown, { phone }: { phone: string }) => {
      return await authService.authWithOTP(phone);
    },

    verifyOTP: async (
      _: unknown,
      { phone, otp }: { phone: string; otp: string }
    ) => {
      return await authService.verifyOTP(phone, otp);
    },

    adminLogin: async (
      _: unknown,
      { email, password }: { email: string; password: string }
    ) => {
      return await authService.adminLogin(email, password);
    },
     changePassword: async (
      _: unknown,
      args: { oldPassword: string; newPassword: string },
      context: GraphQLContext
    ) => {
      const user = authGuard(context); 
      return authService.changePassword({
        userId: user.id,
        oldPassword: args.oldPassword,
        newPassword: args.newPassword,
      });
    },
  },
};
