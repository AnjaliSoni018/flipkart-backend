import { GraphQLContext } from "../../../types/context";
import { customerService } from "./customer.service";
import { authGuard } from "../../../middlewares/auth.guard";

export const customerResolvers = {
  Query: {
    me: async (_: unknown, __: unknown, context: GraphQLContext) => {
      const user = authGuard(context);
      return customerService.getProfile(Number(user.id));
    },

    getMyAddresses: async (
      _: unknown,
      __: unknown,
      context: GraphQLContext
    ) => {
      const user = authGuard(context);
      return customerService.getMyAddresses(Number(user.id));
    },

    getMyCart: async (_: unknown, __: unknown, context: GraphQLContext) => {
      const user = authGuard(context);
      return customerService.getMyCart(Number(user.id));
    },
  },

  Mutation: {
    updateProfile: async (
      _: unknown,
      args: { name?: string; email?: string },
      context: GraphQLContext
    ) => {
      const user = authGuard(context);
      return customerService.updateProfile(Number(user.id), args);
    },

    addAddress: async (
      _: unknown,
      args: {
        fullName: string;
        phone: string;
        addressLine1: string;
        addressLine2?: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        isDefault?: boolean;
      },
      context: GraphQLContext
    ) => {
      const user = authGuard(context);
      return customerService.addAddress(Number(user.id), args);
    },

    updateAddress: async (
      _: unknown,
      args: {
        addressId: number;
        fullName?: string;
        phone?: string;
        addressLine1?: string;
        addressLine2?: string;
        city?: string;
        state?: string;
        postalCode?: string;
        country?: string;
        isDefault?: boolean;
      },
      context: GraphQLContext
    ) => {
      const user = authGuard(context);
      return customerService.updateAddress(Number(user.id), args);
    },

    deleteAddress: async (
      _: unknown,
      args: { addressId: number },
      context: GraphQLContext
    ) => {
      const user = authGuard(context);
      return customerService.deleteAddress(Number(user.id), args.addressId);
    },

    addToCart: async (
      _: unknown,
      args: { productId: number; quantity: number },
      context: GraphQLContext
    ) => {
      const user = authGuard(context);
      return customerService.addToCart(
        Number(user.id),
        args.productId,
        args.quantity
      );
    },

    updateCartItem: async (
      _: unknown,
      args: { productId: number; quantity: number },
      context: GraphQLContext
    ) => {
      const user = authGuard(context);
      return customerService.updateCartItem(
        Number(user.id),
        args.productId,
        args.quantity
      );
    },

    removeCartItem: async (
      _: unknown,
      args: { productId: number },
      context: GraphQLContext
    ) => {
      const user = authGuard(context);
      return customerService.removeCartItem(Number(user.id), args.productId);
    },

    clearCart: async (_: unknown, __: unknown, context: GraphQLContext) => {
      const user = authGuard(context);
      return customerService.clearCart(Number(user.id));
    },
  },
};
