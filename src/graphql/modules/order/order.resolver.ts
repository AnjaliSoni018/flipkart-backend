import { GraphQLContext } from "../../../types/context";
import { orderService } from "./order.service";
import { authGuard } from "../../../middlewares/auth.guard";

export const orderResolvers = {
  Query: {
    getMyOrders: async (_: unknown, __: unknown, context: GraphQLContext) => {
      const user = authGuard(context);
      return orderService.getMyOrders(Number(user.id));
    },

    getOrderDetails: async (
      _: unknown,
      args: { orderId: number },
      context: GraphQLContext
    ) => {
      const user = authGuard(context);
      return orderService.getOrderDetails(Number(user.id), args.orderId);
    },
  },

  Mutation: {
    placeOrder: async (
      _: unknown,
      args: { addressId: number },
      context: GraphQLContext
    ) => {
      const user = authGuard(context);
      return orderService.placeOrder(Number(user.id), args.addressId);
    },

    cancelOrder: async (
      _: unknown,
      args: { orderId: number },
      context: GraphQLContext
    ) => {
      const user = authGuard(context);
      return orderService.cancelOrder(Number(user.id), args.orderId);
    },
  },
};
