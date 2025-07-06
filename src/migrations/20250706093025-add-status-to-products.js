export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('products', 'status', {
    type: Sequelize.ENUM('pending', 'approved', 'rejected'),
    allowNull: false,
    defaultValue: 'pending',
  });
}

export async function down(queryInterface) {
  await queryInterface.removeColumn('products', 'status');
}
