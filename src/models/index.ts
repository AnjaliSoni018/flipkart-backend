import { Sequelize } from "sequelize";
import { initUserModel, User } from "./User";
import { initProductModel, ProductInstance } from "./product";
import { initProductImageModel, ProductImageInstance } from "./productImage";
import { CategoryInstance, initCategoryModel } from "./category";
import { sequelize } from "../config/db";

interface DB {
  sequelize: Sequelize;
  User: typeof User;
  Product: typeof ProductInstance;
  ProductImage: typeof ProductImageInstance;
  Category: typeof CategoryInstance;
}

const db = {} as DB;

db.sequelize = sequelize;
db.User = initUserModel(sequelize);
db.Product = initProductModel(sequelize);
db.ProductImage = initProductImageModel(sequelize);
db.Category = initCategoryModel(sequelize);

db.Product.belongsTo(db.User, { foreignKey: "sellerId", as: "seller" });
db.Product.belongsTo(db.Category, { foreignKey: "categoryId", as: "category" });
db.Product.hasMany(db.ProductImage, { foreignKey: "productId", as: "images" });
db.ProductImage.belongsTo(db.Product, { foreignKey: "productId" });

export default db;
