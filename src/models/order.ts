import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface OrderAttributes {
  id: number;
  userId: number;
  addressId: number;
  paymentId?: number | null;
  totalAmount: number;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  placedAt: Date;
  updatedAt: Date;
}

type OrderCreationAttributes = Optional<
  OrderAttributes,
  "id" | "paymentId" | "placedAt" | "updatedAt"
>;

export class OrderInstance
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: number;
  public userId!: number;
  public addressId!: number;
  public paymentId!: number | null;
  public totalAmount!: number;
  public status!: OrderAttributes["status"];
  public placedAt!: Date;
  public updatedAt!: Date;
}

export const initOrderModel = (sequelize: Sequelize) => {
  OrderInstance.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      addressId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      paymentId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
      totalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      status: {
        type: DataTypes.ENUM(
          "PENDING",
          "PROCESSING",
          "SHIPPED",
          "DELIVERED",
          "CANCELLED"
        ),
        allowNull: false,
        defaultValue: "PENDING",
      },
      placedAt: {
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
      modelName: "Order",
      tableName: "orders",
      timestamps: false,
      underscored: true,
    }
  );

  return OrderInstance;
};
