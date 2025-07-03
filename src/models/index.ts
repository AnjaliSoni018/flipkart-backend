import { Sequelize } from "sequelize";
import { initUserModel, User } from "./user";
import { initProductModel, ProductInstance } from "./product";
import { initProductImageModel, ProductImageInstance } from "./productImage";
import { CategoryInstance, initCategoryModel } from "./category";
import { sequelize } from "../config/db";
import { AddressInstance, initAddressModel } from "./address";
import { CartItemInstance, initCartItemModel } from "./cartItem";
import { initOrderModel, OrderInstance } from "./order";
import { initOrderItemModel, OrderItemInstance } from "./orderItem";
import { initPaymentModel, PaymentInstance } from "./payment";

interface DB {
  sequelize: Sequelize;
  User: typeof User;
  Product: typeof ProductInstance;
  ProductImage: typeof ProductImageInstance;
  Category: typeof CategoryInstance;
  Address: typeof AddressInstance;
  CartItem: typeof CartItemInstance;
  Order: typeof OrderInstance;
  OrderItem: typeof OrderItemInstance;
  Payment: typeof PaymentInstance;
}

const db = {} as DB;

db.sequelize = sequelize;
db.User = initUserModel(sequelize);
db.Product = initProductModel(sequelize);
db.ProductImage = initProductImageModel(sequelize);
db.Category = initCategoryModel(sequelize);
db.Address = initAddressModel(sequelize);
db.CartItem = initCartItemModel(sequelize);
db.Order = initOrderModel(sequelize);
db.OrderItem = initOrderItemModel(sequelize);
db.Payment = initPaymentModel(sequelize);

db.Product.belongsTo(db.User, { foreignKey: "sellerId", as: "seller" });
db.Product.belongsTo(db.Category, { foreignKey: "categoryId", as: "category" });
db.Product.hasMany(db.ProductImage, { foreignKey: "productId", as: "images" });
db.ProductImage.belongsTo(db.Product, { foreignKey: "productId" });
db.User.hasMany(db.Address, { foreignKey: "userId", as: "addresses" });
db.Address.belongsTo(db.User, { foreignKey: "userId", as: "user" });
db.CartItem.belongsTo(db.User, { foreignKey: "userId", as: "user" });
db.CartItem.belongsTo(db.Product, { foreignKey: "productId", as: "product" });
db.Order.belongsTo(db.User, { foreignKey: "userId", as: "user" });
db.Order.belongsTo(db.Address, { foreignKey: "addressId", as: "address" });
db.Order.hasMany(db.OrderItem, { foreignKey: "orderId", as: "items" });
db.Order.belongsTo(db.Payment, { foreignKey: "paymentId", as: "payment" });

db.OrderItem.belongsTo(db.Order, { foreignKey: "orderId" });
db.OrderItem.belongsTo(db.Product, { foreignKey: "productId" });

db.Payment.belongsTo(db.Order, { foreignKey: "orderId" });

export default db;
