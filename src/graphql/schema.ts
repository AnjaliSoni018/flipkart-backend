// import { mergeTypeDefs } from "@graphql-tools/merge";
// import { mergeResolvers } from "@graphql-tools/merge";

import { authTypeDefs } from "./modules/auth/auth.typeDefs";
import { authResolvers } from "./modules/auth/auth.resolvers";
import { sellerTypeDefs } from "./modules/seller/seller.typeDefs";
import { sellerResolvers } from "./modules/seller/seller.resolvers";
import { adminTypeDefs } from "./modules/admin/admin.typeDefs";
import { adminResolvers } from "./modules/admin/admin.resolvers";

export const typeDefs = [authTypeDefs, sellerTypeDefs, adminTypeDefs];
export const resolvers = [authResolvers, sellerResolvers, adminResolvers];
