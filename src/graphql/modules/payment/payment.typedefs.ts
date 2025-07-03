// import { gql } from "graphql-tag";

// export const paymentTypeDefs = gql`
//   extend type Mutation {
//     createRazorpayOrder(orderId: Int!): RazorpayOrderResponse!
//     updatePaymentStatus(paymentId: Int!, status: String!): PaymentResponse!
//   }

//   type RazorpayOrderResponse {
//     success: Boolean!
//     message: String
//     razorpayOrderId: String
//     amount: Float!
//     currency: String!
//   }

//   type PaymentResponse {
//     success: Boolean!
//     message: String
//     payment: Payment
//   }

//   type Payment {
//     id: ID!
//     orderId: Int!
//     paymentMethod: String!
//     paymentStatus: String!
//     transactionId: String
//     paidAt: String
//     createdAt: String
//     updatedAt: String
//   }
// `;
