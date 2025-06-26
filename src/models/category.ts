import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface CategoryAttributes {
  id: number;
  name: string;
  parentId?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

type CategoryCreationAttributes = Optional<
  CategoryAttributes,
  "id" | "parentId" | "createdAt" | "updatedAt"
>;

export class CategoryInstance
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: number;
  public name!: string;
  public parentId?: number | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initCategoryModel = (sequelize: Sequelize) => {
  CategoryInstance.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      parentId: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "categories",
      timestamps: true,
    }
  );

  return CategoryInstance;
};
