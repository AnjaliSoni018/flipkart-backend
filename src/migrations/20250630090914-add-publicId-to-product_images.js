"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn("product_images", "publicId", {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  });
}
export async function down(queryInterface) {
  await queryInterface.removeColumn("product_images", "publicId");
}
