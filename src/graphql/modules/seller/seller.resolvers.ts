import { sellerService } from "./seller.service";
import { authGuard } from "../../../middlewares/auth.guard";
import { GraphQLContext } from "../../../types/context";

export const sellerResolvers = {
  Mutation: {
    applyForSeller: async (
      _: unknown,
      {
        gstin,
        email,
        password,
      }: { gstin: string; email: string; password: string },
      context: GraphQLContext
    ) => {
      const user = authGuard(context);
      return sellerService.applyForSeller(
        Number(user.id),
        gstin,
        email,
        password
      );
    },
    sellerLogin: async (
      _: unknown,
      { email, password }: { email: string; password: string }
    ) => {
      return sellerService.sellerLogin(email, password);
    },
  },
};
