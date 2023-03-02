const sequelize = require('sequelize')
const database = require('../db')
const schema =""

class User extends sequelize.Model{}

User.init(
     {
        id: 
        {
            type: sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nome: 
        {
            type: sequelize.STRING,
            allowNull: false
        },
        email: 
        {
            type: sequelize.STRING,
            allowNull: false,
            unique: true
        }
     },
     {
        sequelize: database, modelName:'boostech', schema
     }
)

module.exports = User