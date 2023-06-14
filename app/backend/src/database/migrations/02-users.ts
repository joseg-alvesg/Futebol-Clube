import { Model, QueryInterface, DataTypes } from "sequelize";
import { User } from "../../Interfaces/users.interface";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable<Model<User>>("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "username",
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("users");
  }, };
