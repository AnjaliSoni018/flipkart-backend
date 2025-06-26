import { gql } from "graphql-tag";

export const sellerTypeDefs = gql`
  extend type Mutation {
    applyForSeller(
      gstin: String!
      email: String!
      password: String!
    ): SellerApplicationResponse!
    sellerLogin(email: String!, password: String!): AuthPayload!
  }

  type SellerApplicationResponse {
    success: Boolean!
    message: String
    user: User!
  }

  type AuthPayload {
    token: String!
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
