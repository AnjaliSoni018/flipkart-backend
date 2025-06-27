import { productService } from "./product.service";
import { authGuard } from "../../../middlewares/auth.guard";
import { roleGuard } from "../../../middlewares/role.guard";
import { GraphQLContext } from "../../../types/context";
import db from "../../../models";

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
    deleteProduct: async (
      _: unknown,
      args: { productId: number },
      context: GraphQLContext
    ) => {
      const user = authGuard(context);
      if (!user || user.role !== "SELLER") {
        throw new Error("Unauthorized");
      }

      return await productService.deleteProduct(
        args.productId,
        Number(user.id)
      );
    },
  },

  Query: {
    myProducts: async (
      _: unknown,
      args: { limit?: number; offset?: number },
      context: GraphQLContext
    ) => {
      const user = authGuard(context);
      roleGuard(context, ["SELLER"]);

      const limit = args.limit || 10;
      const offset = args.offset || 0;

      const { count, rows: products } = await db.Product.findAndCountAll({
        where: { sellerId: user.id },
        limit,
        offset,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: db.ProductImage,
            as: "images",
          },
        ],
      });

      return {
        success: true,
        message: "Products fetched successfully",
        products,
        total: count,
      };
    },
    getProducts: async (
      _: unknown,
      args: { limit?: number; offset?: number; categoryId?: number }
    ) => {
      const { total, products } = await productService.getProducts(args);

      return {
        success: true,
        message: "Products fetched successfully",
        products,
        total,
      };
    },

    getProductById: async (_: unknown, args: { productId: number }) => {
      const product = await productService.getProductById(args.productId);

      return {
        success: true,
        message: "Product details fetched successfully",
        product,
      };
    },
  },
};
