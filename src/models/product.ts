import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface ProductAttributes {
  id: number;
  sellerId: number;
  categoryId: number;
  name: string;
  description?: string;
  price: number;
  stockQty: number;
  isActive: boolean;
  status: 'pending' | 'approved' | 'rejected'; 
  createdAt?: Date;
  updatedAt?: Date;
}

type ProductCreationAttributes = Optional<
  ProductAttributes,
  "id" | "description" | "stockQty" | "isActive" | "status" | "createdAt" | "updatedAt"
>;

export class ProductInstance
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public sellerId!: number;
  public categoryId!: number;
  public name!: string;
  public description?: string;
  public price!: number;
  public stockQty!: number;
  public isActive!: boolean;
  public status!: 'pending' | 'approved' | 'rejected';  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initProductModel = (sequelize: Sequelize) => {
  ProductInstance.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      sellerId: { type: DataTypes.INTEGER, allowNull: false },
      categoryId: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      stockQty: { type: DataTypes.INTEGER, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
      status: { 
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      timestamps: true,
    }
  );

  return ProductInstance;
};
