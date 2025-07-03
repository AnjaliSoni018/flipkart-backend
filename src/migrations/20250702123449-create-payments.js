"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("payments", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "orders",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    payment_method: {
      type: Sequelize.ENUM("DIGITAL", "CASH"),
      allowNull: false,
    },
    payment_status: {
      type: Sequelize.ENUM("PENDING", "SUCCESS", "FAILED", "REFUNDED"),
      allowNull: false,
      defaultValue: "PENDING",
    },
    transaction_id: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    paid_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("payments");
}
