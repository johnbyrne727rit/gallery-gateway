export function up (queryInterface, Sequelize) {
  return queryInterface.createTable('portfolio_scholarships', {
    portfolioId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'portfolios', key: 'id' },
      primaryKey: true
    },
    scholarshipId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'scholarships', key: 'id' },
      primaryKey: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    }
  })
}

export function down (queryInterface) {
  return queryInterface.dropTable('portfolio_scholarships')
}
