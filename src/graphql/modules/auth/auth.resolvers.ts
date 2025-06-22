import { authService } from "./auth.service";

export const authResolvers = {
  Query: {
    _empty: () => "API running 🚀",
  },
  Mutation: {
    authWithOTP: async (_: unknown, { phone }: { phone: string }) => {
      return await authService.authWithOTP(phone);
    },
    verifyOTP: async (
      _: unknown,
      { phone, otp }: { phone: string; otp: number }
    ) => {
      return await authService.verifyOTP(phone, otp);
    },
  },
};
