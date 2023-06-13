import { Model, QueryInterface, DataTypes } from "sequelize";
import { Team } from "../../Interfaces/team.model";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable<Model<Team>>("teams", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      teamName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "team_name",
      },
    });
  },
  down: (queryInterface: QueryInterface) => queryInterface.dropTable("teams"),
};
