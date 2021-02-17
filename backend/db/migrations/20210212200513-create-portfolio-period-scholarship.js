export function up (queryInterface, Sequelize) {
  return queryInterface.createTable('portfolioPeriod_scholarships', {
    portfolioPeriodId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'portfolioPeriods', key: 'id' },
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
  return queryInterface.dropTable('portfolioPeriod_scholarships')
}
