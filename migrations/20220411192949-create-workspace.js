'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Workspaces', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdBy: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('Workspaces', {
        fields: ['createdBy'],
        type: 'foreign key',
        name: 'custom_fkey_constraint_name',
        references: {
            table: 'Users',
            field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    });
  },
  async down(queryInterface) {
    await queryInterface.removeConstraint('Workspaces', 'custom_fkey_constraint_name')
    await queryInterface.dropTable('Workspaces');
  }
};
