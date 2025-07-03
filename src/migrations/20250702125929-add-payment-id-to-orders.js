"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn("orders", "payment_id", {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: true,
    references: {
      model: "payments",
      key: "id",
    },
    onDelete: "SET NULL",
  });
}

export async function down(queryInterface) {
  await queryInterface.removeColumn("orders", "payment_id");
}
