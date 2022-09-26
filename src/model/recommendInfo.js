// Role.js
const { DataTypes } = require('sequelize')
const sequelize = require('../database/db')

// 数据类型 https://www.sequelize.com.cn/core-concepts/model-basics#%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B
const Activity_info = sequelize.define('activity_info', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: sequelize.UUIDV4,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  content: DataTypes.STRING,
  

  time: DataTypes.INTEGER,
 
})

module.exports = Activity_info
