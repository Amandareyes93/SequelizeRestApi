import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

import {Task} from './Task.js'

// este const Project seria mi esquema
export const Project = sequelize.define(
  'projects',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    priority: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

// Como hacer un enlace uno a muchos
Project.hasMany(Task,{
  foreignKey: 'projectId',
  sourceKey: 'id'
})

Task.belongsTo(Project, {
  foreignKey: 'projectId',
  targetId: 'id'
})
