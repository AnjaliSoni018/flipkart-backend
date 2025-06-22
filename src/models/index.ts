import { Sequelize } from "sequelize";
import { sequelize } from "../config/db";
import { initUserModel, User } from "./User";

console.log("🚨 Checking sequelize instance");
console.log("Instanceof Sequelize?", sequelize instanceof Sequelize);

// ❗ IMPORTANT: init after Sequelize instance is defined
console.log("Before initializing models...");
console.log("Sequelize instance:", sequelize instanceof Object);
initUserModel(sequelize);
console.log("All models initialized.");
console.log("Sequelize instance:", sequelize instanceof Object); // should be true

export default  {
  sequelize,
  User,
};

// export default db;
