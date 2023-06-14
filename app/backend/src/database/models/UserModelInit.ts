import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class UserModelInit extends Model<InferAttributes<UserModelInit>,
InferCreationAttributes<UserModelInit>> {
  declare id: CreationOptional<number>;

  declare username: CreationOptional<string>;

  declare role: CreationOptional<string>;

  declare email: CreationOptional<string>;

  declare password: CreationOptional<string>;
}

UserModelInit.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(UserModelInit, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(UserModelInit, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// UserModelInit.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// UserModelInit.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default UserModelInit;
