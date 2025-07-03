import { gql } from "graphql-tag";

export const orderTypeDefs = gql`
  extend type Query {
    getMyOrders: OrderListResponse!
    getOrderDetails(orderId: Int!): OrderDetailsResponse!
  }

  extend type Mutation {
    placeOrder(addressId: Int!): OrderResponse!
    cancelOrder(orderId: Int!): OrderResponse!
  }

  # Order Types
  type Order {
    id: ID!
    userId: ID!
    addressId: ID!
    paymentId: ID
    totalAmount: Float!
    status: String!
    placedAt: String
    updatedAt: String
  }

  type OrderItem {
    id: ID!
    orderId: ID!
    productId: ID!
    quantity: Int!
    priceAtOrder: Float!
    createdAt: String
    updatedAt: String
  }

  type Payment {
    id: ID!
    orderId: ID!
    paymentMethod: String!
    paymentStatus: String!
    transactionId: String
    paidAt: String
    createdAt: String
    updatedAt: String
  }

  # Response Types
  type OrderListResponse {
    success: Boolean!
    message: String
    orders: [Order!]!
  }

  type OrderDetailsResponse {
    success: Boolean!
    message: String
    order: Order
    items: [OrderItem!]!
    payment: Payment
  }

  type OrderResponse {
    success: Boolean!
    message: String
    order: Order
  }
`;
