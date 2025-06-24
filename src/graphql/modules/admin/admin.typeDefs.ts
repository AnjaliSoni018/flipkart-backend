import { gql } from "graphql-tag";

export const adminTypeDefs = gql`
  extend type Query {
    pendingSellers: [User!]!
  }

  extend type Mutation {
    approveSeller(userId: ID!): ApproveResponse!
  }

  type ApproveResponse {
    success: Boolean!
    message: String
  }
`;
