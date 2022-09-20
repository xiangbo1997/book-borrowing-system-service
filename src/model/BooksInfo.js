// Role.js
const { DataTypes } = require('sequelize')
const sequelize = require('../database/db')

// 数据类型 https://www.sequelize.com.cn/core-concepts/model-basics#%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B
const BooksInfo = sequelize.define('books_info', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    press: DataTypes.STRING,
    publication_date: DataTypes.DATE,
    create_time:  DataTypes.DATE,
    update_time: DataTypes.DATE,
    img_url: DataTypes.STRING,
    introduction:DataTypes.STRING,
    total:DataTypes.INTEGER ,           
    remaining:DataTypes.INTEGER,           
    position:DataTypes.STRING,  
    category:DataTypes.STRING         
})

module.exports = BooksInfo
