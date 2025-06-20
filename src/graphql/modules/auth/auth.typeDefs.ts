import { gql } from "graphql-tag";

export const authTypeDefs = gql`
  type Mutation {
    authWithOTP(phone: String!): OTPResponse!
    verifyOTP(phone: String!, otp: Int!): AuthPayload!
  }

  type OTPResponse {
    success: Boolean!
    message: String
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
    isApproved: Boolean!
    gstin: String
    createdAt: String
    updatedAt: String
  }
`;
