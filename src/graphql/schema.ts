import { mergeTypeDefs } from "@graphql-tools/merge";
import { mergeResolvers } from "@graphql-tools/merge";

import { authTypeDefs } from "./modules/auth/auth.typeDefs";
import { authResolvers } from "./modules/auth/auth.resolvers";

export const typeDefs = mergeTypeDefs([authTypeDefs]);
export const resolvers = mergeResolvers([authResolvers]);
