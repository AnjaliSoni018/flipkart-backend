import { sellerService } from "./seller.service";
import { authGuard } from "../../../middlewares/auth.guard";
import { GraphQLContext } from "../../../types/context";

export const sellerResolvers = {
  Mutation: {
    applyForSeller: async (
      _: unknown,
      { gstin }: { gstin: string },
      context: GraphQLContext
    ) => {
      const user = authGuard(context);
      return sellerService.applyForSeller(Number(user.id), gstin);
    },
  },
};
