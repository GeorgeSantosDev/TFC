import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

import Matches from './matches.model';

export default class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    type: STRING,
    field: 'team_name',
  },
}, {
  sequelize: db,
  modelName: 'Team',
  timestamps: false,
  underscored: true,
});

Team.hasMany(Matches, { foreignKey: 'homeTeamId', sourceKey: 'id', as: 'homeTeam' });
Team.hasMany(Matches, { foreignKey: 'awayTeamId', sourceKey: 'id', as: 'awayTeam' });
