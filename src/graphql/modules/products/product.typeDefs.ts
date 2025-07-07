import { gql } from "graphql-tag";

export const productTypeDefs = gql`
  enum ProductStatus {
    pending
    approved
    rejected
  }
  type Product {
    id: ID!
    sellerId: ID!
    categoryId: ID!
    name: String!
    description: String
    price: Float!
    stockQty: Int!
    status: ProductStatus!
    isActive: Boolean!
    createdAt: String
    updatedAt: String
    images: [ProductImage!]!
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

  type MyProductsResponse {
    success: Boolean!
    message: String
    products: [Product!]!
    total: Int!
  }

  type PublicProductsResponse {
    success: Boolean!
    message: String
    products: [Product!]!
    total: Int!
  }

  type ProductDetailResponse {
    success: Boolean!
    message: String
    product: Product
  }

  type DeleteProductResponse {
    success: Boolean!
    message: String
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
    deleteProduct(productId: Int!): DeleteProductResponse!
  }

  extend type Query {
    myProducts(limit: Int, offset: Int): MyProductsResponse!
    getProducts(
      limit: Int
      offset: Int
      categoryId: Int
    ): PublicProductsResponse!
    getProductById(productId: Int!): ProductDetailResponse!
     searchProducts(
    search: String
    categoryId: Int
    limit: Int
    offset: Int
  ): PublicProductsResponse!
  }
`;
