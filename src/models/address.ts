import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface AddressAttributes {
  id: number;
  userId: number;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type AddressCreationAttributes = Optional<
  AddressAttributes,
  "id" | "addressLine2" | "isDefault" | "createdAt" | "updatedAt"
>;

export class AddressInstance
  extends Model<AddressAttributes, AddressCreationAttributes>
  implements AddressAttributes
{
  public id!: number;
  public userId!: number;
  public fullName!: string;
  public phone!: string;
  public addressLine1!: string;
  public addressLine2?: string;
  public city!: string;
  public state!: string;
  public postalCode!: string;
  public country!: string;
  public isDefault!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initAddressModel = (sequelize: Sequelize) => {
  AddressInstance.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      fullName: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: false },
      addressLine1: { type: DataTypes.STRING, allowNull: false },
      addressLine2: { type: DataTypes.STRING },
      city: { type: DataTypes.STRING, allowNull: false },
      state: { type: DataTypes.STRING, allowNull: false },
      postalCode: { type: DataTypes.STRING, allowNull: false },
      country: { type: DataTypes.STRING, allowNull: false },
      isDefault: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "Address",
      tableName: "addresses",
      timestamps: true,
    }
  );

  return AddressInstance;
};
