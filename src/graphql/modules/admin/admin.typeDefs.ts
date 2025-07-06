import { gql } from "graphql-tag";

export const adminTypeDefs = gql`
  extend type Query {
    pendingSellers: [User!]!
    getAllCategories: [Category!]!
    pendingProducts(limit: Int, offset: Int): PendingProductsResponse!
    usersByRoles(roles: [String]!): [User!]!
    adminProfile: AdminProfileResponse!
    searchUsers(
    search: String
    role: String
    limit: Int
    offset: Int
  ): UserSearchResponse!
   adminGetAllProducts(
    limit: Int
    offset: Int
    status: ProductStatus
    categoryId: Int
  ): MyProductsResponse!
  }

  extend type Mutation {
    approveSeller(userId: ID!): ApproveResponse!
    rejectSeller(userId: ID!): ApproveResponse!

     approveProduct(productId: ID!): ApproveResponse!  
    rejectProduct(productId: ID!): ApproveResponse! 

    createCategory(name: String!, parentId: Int): CategoryResponse!
    updateCategory(
      categoryId: Int!
      name: String
      parentId: Int
    ): CategoryResponse!
    deleteCategory(categoryId: Int!): CategoryResponse!
    updateAdminProfile(input: UpdateAdminProfileInput!): AdminProfileResponse!

      blockUser(userId: ID!): UserStatusResponse!
      unblockUser(userId: ID!): UserStatusResponse!
  }

  type ApproveResponse {
    success: Boolean!
    message: String
  }

  type PendingProductsResponse {
    success: Boolean!
    message: String
    products: [Product!]!
    total: Int!
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

  type User {
  id: ID!
  name: String!
  email: String!
  role: String!
  isApproved: Boolean
  isActive: Boolean!
  createdAt: String
  updatedAt: String
}

 type AdminProfile {
    id: ID!
    name: String!
    email: String!
    role: String!
    createdAt: String
    updatedAt: String
  }

  type AdminProfileResponse {
    success: Boolean!
    message: String
    profile: AdminProfile
  }

  input UpdateAdminProfileInput {
    name: String
    email: String
    password: String
  }

  type UserSearchResponse {
  success: Boolean!
  message: String
  users: [User!]!
  total: Int!
}
  type UserStatusResponse {
  success: Boolean!
  message: String
  user: User
}
   type MyProductsResponse {
    success: Boolean!
    message: String
    products: [Product!]!
    total: Int!
  }
`;
