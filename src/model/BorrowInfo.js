// Role.js
const { DataTypes } = require('sequelize')
const sequelize = require('../database/db')

// 数据类型 https://www.sequelize.com.cn/core-concepts/model-basics#%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B
const BorrowInfo = sequelize.define('borrow_info', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: sequelize.UUIDV4,
    autoIncrement: true
  },
  position: DataTypes.STRING,
  category: DataTypes.STRING,
  bookId: {
    type: DataTypes.UUID,
    primaryKey: true,
    // autoIncrement: true
  },

  userId: {
    type: DataTypes.UUID,
    primaryKey: true,
    // autoIncrement: true
  },
  srart_time: DataTypes.DATE,
  time: DataTypes.INTEGER,
  end_time: DataTypes.DATE,
  state: DataTypes.STRING,
})

module.exports = BorrowInfo
