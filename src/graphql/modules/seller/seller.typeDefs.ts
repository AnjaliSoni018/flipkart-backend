import { gql } from "graphql-tag";

export const sellerTypeDefs = gql`
  extend type Mutation {
    applyForSeller(gstin: String!): SellerApplicationResponse!
  }

  type SellerApplicationResponse {
    success: Boolean!
    message: String
    user: User!
  }

  type User {
    id: ID!
    name: String
    phone: String!
    email: String
    role: String!
    isVerified: Boolean!
    isApproved: Boolean
    gstin: String
    createdAt: String
    updatedAt: String
  }
`;
