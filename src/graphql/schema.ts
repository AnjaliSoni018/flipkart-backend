// import { mergeTypeDefs } from "@graphql-tools/merge";
// import { mergeResolvers } from "@graphql-tools/merge";

import { authTypeDefs } from "./modules/auth/auth.typeDefs";
import { authResolvers } from "./modules/auth/auth.resolvers";
import { sellerTypeDefs } from "./modules/seller/seller.typeDefs";
import { sellerResolvers } from "./modules/seller/seller.resolvers";
import { adminTypeDefs } from "./modules/admin/admin.typeDefs";
import { adminResolvers } from "./modules/admin/admin.resolvers";
import { productTypeDefs } from "./modules/products/product.typeDefs";
import { productResolvers } from "./modules/products/product.resolvers";
import { customerTypeDefs } from "./modules/customer/customer.typedefs";
import { customerResolvers } from "./modules/customer/customer.resolver";

export const typeDefs = [
  authTypeDefs,
  sellerTypeDefs,
  adminTypeDefs,
  productTypeDefs,
  customerTypeDefs,
];
export const resolvers = [
  authResolvers,
  sellerResolvers,
  adminResolvers,
  productResolvers,
  customerResolvers,
];
