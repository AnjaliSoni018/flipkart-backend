import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface PaymentAttributes {
  id: number;
  orderId: number;
  paymentMethod: "DIGITAL" | "CASH";
  paymentStatus: "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";
  transactionId?: string | null;
  paidAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

type PaymentCreationAttributes = Optional<
  PaymentAttributes,
  "id" | "transactionId" | "paidAt" | "createdAt" | "updatedAt"
>;

export class PaymentInstance
  extends Model<PaymentAttributes, PaymentCreationAttributes>
  implements PaymentAttributes
{
  public id!: number;
  public orderId!: number;
  public paymentMethod!: "DIGITAL" | "CASH";
  public paymentStatus!: "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";
  public transactionId!: string | null;
  public paidAt!: Date | null;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export const initPaymentModel = (sequelize: Sequelize) => {
  PaymentInstance.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      orderId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      paymentMethod: {
        type: DataTypes.ENUM("DIGITAL", "CASH"),
        allowNull: false,
      },
      paymentStatus: {
        type: DataTypes.ENUM("PENDING", "SUCCESS", "FAILED", "REFUNDED"),
        allowNull: false,
        defaultValue: "PENDING",
      },
      transactionId: { type: DataTypes.STRING, allowNull: true },
      paidAt: { type: DataTypes.DATE, allowNull: true },
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
      modelName: "Payment",
      tableName: "payments",
      timestamps: false,
      underscored: true,
    }
  );

  return PaymentInstance;
};
