import Sequelize from 'sequelize'

export const sequelize = new Sequelize('sequelizeapirest','root','2456Aerb',{
  host: 'localhost',
  dialect: 'mysql'
})
