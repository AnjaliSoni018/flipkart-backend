import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface UserAttributes {
  id: number;
  name?: string | null;
  phone: string;
  email?: string | null;
  password?: string | null;
  role: "CUSTOMER" | "SELLER" | "ADMIN";
  isVerified: boolean;
  isApproved: boolean;
  isActive: boolean;
  gstin?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

type UserCreationAttributes = Optional<
  UserAttributes,
  "id" | "name" | "email" | "password" | "gstin" | "isVerified" | "isApproved"|"isActive"
>;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string | null;
  public phone!: string;
  public email!: string | null;
  public password!: string | null;
  public role!: "CUSTOMER" | "SELLER" | "ADMIN";
  public isVerified!: boolean;
  public isApproved!: boolean;
  public isActive!: boolean;
  public gstin!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initUserModel = (sequelize: Sequelize) => {
  console.log("Initializing User model...");
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM("CUSTOMER", "SELLER", "ADMIN"),
        allowNull: false,
        defaultValue: "CUSTOMER",
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isApproved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
       isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      gstin: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
    }
  );
  return User;
  console.log("User model initialized.");
};
