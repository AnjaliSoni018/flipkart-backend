import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const dbName = process.env.DB_NAME!;
const dbUser = process.env.DB_USER!;
const dbPass = process.env.DB_PASS!;
const dbHost = process.env.DB_HOST!;

console.log("ENV", { dbName, dbUser, dbPass, dbHost });

export const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: "mysql",
  logging: false,
  define: {
    underscored: true,
    timestamps: true,
  },
});

console.log("Sequelize created?", sequelize instanceof Sequelize);
console.log("Sequelize config loaded");
console.log("DB:", process.env.DB_NAME, "User:", process.env.DB_USER);
