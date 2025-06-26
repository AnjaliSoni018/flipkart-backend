import { productService } from "./product.service";
import { authGuard } from "../../../middlewares/auth.guard";
import { roleGuard } from "../../../middlewares/role.guard";
import { GraphQLContext } from "../../../types/context";

export const productResolvers = {
  Mutation: {
    createProduct: async (
      _: unknown,
      args: {
        categoryId: number;
        name: string;
        description?: string;
        price: number;
        stockQty: number;
      },
      context: GraphQLContext
    ) => {
      const user = authGuard(context);
      roleGuard(context, ["SELLER"]);

      return productService.createProduct({
        ...args,
        sellerId: Number(user.id),
      });
    },

    addProductImage: async (
      _: unknown,
      args: {
        productId: number;
        localFilePath: string;
        altText?: string;
        isPrimary?: boolean;
      },
      context: GraphQLContext
    ) => {
      const user = authGuard(context);
      roleGuard(context, ["SELLER"]);

      return productService.addProductImage({
        ...args,
        sellerId: Number(user.id),
      });
    },
    updateProduct: async (
      _: unknown,
      args: {
        productId: number;
        name?: string;
        description?: string;
        price?: number;
        stockQty?: number;
        isActive?: boolean;
      },
      context: GraphQLContext
    ) => {
      const user = authGuard(context);
      roleGuard(context, ["SELLER"]);

      return productService.updateProduct({
        ...args,
        sellerId: Number(user.id),
      });
    },
    updateProductImage: async (
      _: unknown,
      args: {
        imageId: number;
        localFilePath?: string;
        altText?: string;
        isPrimary?: boolean;
      },
      context: GraphQLContext
    ) => {
      const user = authGuard(context);
      roleGuard(context, ["SELLER"]);

      return productService.updateProductImage({
        ...args,
        sellerId: Number(user.id),
      });
    },
    deleteProductImage: async (
      _: unknown,
      args: { imageId: number },
      context: GraphQLContext
    ) => {
      const user = authGuard(context);
      roleGuard(context, ["SELLER"]);

      return productService.deleteProductImage({
        imageId: args.imageId,
        sellerId: Number(user.id),
      });
    },
  },
};
