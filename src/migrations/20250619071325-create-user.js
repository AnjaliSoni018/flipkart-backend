"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("users", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    role: {
      type: Sequelize.ENUM("CUSTOMER", "SELLER", "ADMIN"),
      allowNull: false,
      defaultValue: "CUSTOMER",
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isApproved: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    gstin: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
  });
}
export async function down(queryInterface) {
  await queryInterface.dropTable("users");
}
