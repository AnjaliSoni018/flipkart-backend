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

  extend type Mutation {
    createCategory(name: String!, parentId: Int): CategoryResponse!
  }

  type Category {
    id: ID!
    name: String!
    parentId: Int
    createdAt: String
    updatedAt: String
  }

  type CategoryResponse {
    success: Boolean!
    message: String
    category: Category
  }
`;
