import { gql } from "graphql-tag";

export const customerTypeDefs = gql`
  extend type Query {
    me: UserProfileResponse!
    getMyAddresses: AddressListResponse!
    getMyCart: CartResponse!
  }

  extend type Mutation {
    updateProfile(name: String, email: String): UserProfileResponse!

    addAddress(
      fullName: String!
      phone: String!
      addressLine1: String!
      addressLine2: String
      city: String!
      state: String!
      postalCode: String!
      country: String!
      isDefault: Boolean
    ): AddressResponse!

    updateAddress(
      addressId: Int!
      fullName: String
      phone: String
      addressLine1: String
      addressLine2: String
      city: String
      state: String
      postalCode: String
      country: String
      isDefault: Boolean
    ): AddressResponse!

    deleteAddress(addressId: Int!): AddressResponse!

    # Cart Operations
    addToCart(productId: Int!, quantity: Int!): CartResponse!
    removeCartItem(productId: Int!): CartResponse!
    updateCartItem(productId: Int!, quantity: Int!): CartResponse!
    clearCart: CartResponse!
  }

  type UserProfileResponse {
    success: Boolean!
    message: String
    user: User
  }

  type Address {
    id: ID!
    userId: ID!
    fullName: String!
    phone: String!
    addressLine1: String!
    addressLine2: String
    city: String!
    state: String!
    postalCode: String!
    country: String!
    isDefault: Boolean!
    createdAt: String
    updatedAt: String
  }

  type AddressResponse {
    success: Boolean!
    message: String
    address: Address
  }

  type AddressListResponse {
    success: Boolean!
    message: String
    addresses: [Address!]!
  }

  # Cart Types
  type CartItem {
    productId: ID!
    name: String!
    price: Float!
    quantity: Int!
    totalPrice: Float!
  }

  type CartResponse {
    success: Boolean!
    message: String
    cart: [CartItem!]!
    totalAmount: Float!
  }
`;
