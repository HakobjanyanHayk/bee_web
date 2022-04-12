'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('WorkspaceUsers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
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

        await queryInterface.addConstraint('WorkspaceUsers', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'custom_fkey_constraint_name_users_aa',
            references: {
                table: 'Users',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        await queryInterface.addConstraint('WorkspaceUsers', {
            fields: ['workspaceId'],
            type: 'foreign key',
            name: 'custom_fkey_constraint_name_workspaces_bb',
            references: {
                table: 'Workspaces',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    },
    async down(queryInterface) {
        await queryInterface.removeConstraint('WorkspaceUsers', 'custom_fkey_constraint_name_users_aa')
        await queryInterface.removeConstraint('WorkspaceUsers', 'custom_fkey_constraint_name_workspaces_bb')
        await queryInterface.dropTable('WorkspaceUsers');
    }
};
