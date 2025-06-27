import { gql } from "graphql-tag";

export const adminTypeDefs = gql`
  extend type Query {
    pendingSellers: [User!]!
    getAllCategories: [Category!]!
  }

  extend type Mutation {
    approveSeller(userId: ID!): ApproveResponse!

    createCategory(name: String!, parentId: Int): CategoryResponse!
    updateCategory(
      categoryId: Int!
      name: String
      parentId: Int
    ): CategoryResponse!
    deleteCategory(categoryId: Int!): CategoryResponse!
  }

  type ApproveResponse {
    success: Boolean!
    message: String
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
