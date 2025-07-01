import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { ProductInstance } from "./product";

interface CartItemAttributes {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type CartItemCreationAttributes = Optional<
  CartItemAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export class CartItemInstance
  extends Model<CartItemAttributes, CartItemCreationAttributes>
  implements CartItemAttributes
{
  public id!: number;
  public userId!: number;
  public productId!: number;
  public quantity!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public product?: ProductInstance;
}

export const initCartItemModel = (sequelize: Sequelize) => {
  CartItemInstance.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "CartItem",
      tableName: "cart_items",
      timestamps: true,
      underscored: true,
    }
  );

  return CartItemInstance;
};
