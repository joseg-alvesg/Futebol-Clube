import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

export default class TeamModel extends Model<InferAttributes<TeamModel>,
InferCreationAttributes<TeamModel>> {
  declare id: CreationOptional<number>;

  declare teamName: CreationOptional<string>;
}

TeamModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

TeamModel.hasMany(TeamModel, {
  foreignKey: 'id',
  as: 'homeTeam',
});

TeamModel.hasMany(TeamModel, {
  foreignKey: 'id',
  as: 'awayTeam',
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(TeamModel, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(TeamModel, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// TeamModel.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// TeamModel.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });
