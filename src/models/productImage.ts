import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface ProductImageAttributes {
  id: number;
  productId: number;
  url: string;
  altText?: string;
  isPrimary: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type ProductImageCreationAttributes = Optional<
  ProductImageAttributes,
  "id" | "altText" | "isPrimary" | "createdAt" | "updatedAt"
>;

export class ProductImageInstance
  extends Model<ProductImageAttributes, ProductImageCreationAttributes>
  implements ProductImageAttributes
{
  public id!: number;
  public productId!: number;
  public url!: string;
  public altText?: string;
  public isPrimary!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initProductImageModel = (sequelize: Sequelize) => {
  ProductImageInstance.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      productId: { type: DataTypes.INTEGER, allowNull: false },
      url: { type: DataTypes.STRING, allowNull: false },
      altText: { type: DataTypes.STRING },
      isPrimary: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "ProductImage",
      tableName: "product_images",
      timestamps: true,
    }
  );

  return ProductImageInstance;
};
