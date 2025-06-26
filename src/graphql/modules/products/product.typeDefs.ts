import { gql } from "graphql-tag";

export const productTypeDefs = gql`
  type Product {
    id: ID!
    sellerId: ID!
    categoryId: ID!
    name: String!
    description: String
    price: Float!
    stockQty: Int!
    isActive: Boolean!
    createdAt: String
    updatedAt: String
  }

  type ProductImage {
    id: ID!
    productId: ID!
    url: String!
    altText: String
    isPrimary: Boolean
    createdAt: String
  }

  type ProductResponse {
    success: Boolean!
    message: String
    product: Product
  }

  type ProductImageResponse {
    success: Boolean!
    message: String
    image: ProductImage
  }

  extend type Mutation {
    createProduct(
      categoryId: Int!
      name: String!
      description: String
      price: Float!
      stockQty: Int!
    ): ProductResponse!

    addProductImage(
      productId: Int!
      localFilePath: String!
      altText: String
      isPrimary: Boolean
    ): ProductImageResponse!

    updateProduct(
      productId: Int!
      name: String
      description: String
      price: Float
      stockQty: Int
      isActive: Boolean
    ): ProductResponse!

    updateProductImage(
      imageId: Int!
      localFilePath: String
      altText: String
      isPrimary: Boolean
    ): ProductImageResponse!

    deleteProductImage(imageId: Int!): ProductImageResponse!
  }
`;
