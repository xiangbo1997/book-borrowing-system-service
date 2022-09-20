// Role.js
const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../database/db')

// 数据类型 https://www.sequelize.com.cn/core-concepts/model-basics#%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B
const Role = sequelize.define('role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    status: DataTypes.TINYINT
})

module.exports = Role
