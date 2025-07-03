import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface OrderItemAttributes {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  priceAtOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

type OrderItemCreationAttributes = Optional<
  OrderItemAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export class OrderItemInstance
  extends Model<OrderItemAttributes, OrderItemCreationAttributes>
  implements OrderItemAttributes
{
  public id!: number;
  public orderId!: number;
  public productId!: number;
  public quantity!: number;
  public priceAtOrder!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export const initOrderItemModel = (sequelize: Sequelize) => {
  OrderItemInstance.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      orderId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      productId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      priceAtOrder: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "OrderItem",
      tableName: "order_items",
      timestamps: false,
      underscored: true,
    }
  );

  return OrderItemInstance;
};
