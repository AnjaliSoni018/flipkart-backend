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
  },
};
