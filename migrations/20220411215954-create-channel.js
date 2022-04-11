'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Channels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      createdBy: {
        type: Sequelize.INTEGER
      },
      workspaceId: {
        type: Sequelize.INTEGER
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
    await queryInterface.addConstraint('Channels', {
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
    await queryInterface.addConstraint('Channels', {
        fields: ['workspaceId'],
        type: 'foreign key',
        name: 'custom_fkey_constraint_name_for_workspaces',
        references: {
            table: 'Workspaces',
            field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Channels');
  }
};
