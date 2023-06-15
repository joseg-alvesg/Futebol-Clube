import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';

export default class MatchModelInit extends Model<
InferAttributes<MatchModelInit>,
InferCreationAttributes<MatchModelInit>
> {
  declare id: CreationOptional<number>;

  declare homeTeamId: CreationOptional<number>;

  declare homeTeamGoals: CreationOptional<number>;

  declare awayTeamId: CreationOptional<number>;

  declare awayTeamGoals: CreationOptional<number>;

  declare inProgress: CreationOptional<boolean>;
}

MatchModelInit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize: db,
    tableName: 'matches',
    timestamps: false,
    underscored: true,
  },
);

MatchModelInit.belongsTo(TeamModel, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

MatchModelInit.belongsTo(TeamModel, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});
